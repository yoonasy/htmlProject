'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _ref = _;
var random = _ref.random;
var range = _ref.range;
var times = _ref.times;
var assign = _ref.assign;

var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;
var img = new Image();

var FloatArray = window.Float32Array || Array;

// base +/- range
function fuzzy(range, base) {
  return (base || 0) + (Math.random() - 0.5) * range * 2;
}

function makeOctaveNoise(width, height, octaves) {
  var canvas = document.createElement('canvas'),
      ctx = canvas.getContext('2d');

  canvas.width = width;
  canvas.height = height;

  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, width, height);

  ctx.globalAlpha = 1 / octaves;
  ctx.globalCompositeOperation = 'lighter';

  for (var i = 0; i < octaves; i++) {
    var octave = makeNoise(width >> i, height >> i);
    ctx.drawImage(octave, 0, 0, width, height);
  }
  return canvas;
}

function makeNoise(width, height) {
  var canvas = document.createElement('canvas'),
      ctx = canvas.getContext('2d');

  canvas.width = width;
  canvas.height = height;

  var imgData = ctx.getImageData(0, 0, width, height),
      data = imgData.data,
      pixels = data.length;

  for (var i = 0; i < pixels; i += 4) {
    data[i] = Math.random() * 255;
    data[i + 1] = Math.random() * 255;
    data[i + 2] = Math.random() * 255;
    //       data[i+1] = data[i];
    //     data[i+2] = data[i];
    data[i + 3] = 255;
  }
  ctx.putImageData(imgData, 0, 0);

  return canvas;
}

var noiseCanvas = null;

var defaults = {
  maxAge: 70,
  exposure: 0.1,
  damping: 0.8,
  noise: 1.0,
  fuzz: 1.0,
  intensity: 1.0,
  vx: 10,
  vy: 10,
  spawn: 5,
  octaves: 8,
  color: {
    r: 25,
    g: 100,
    b: 75
  },
  width: WIDTH,
  height: HEIGHT,
  x: WIDTH * 0.5,
  y: HEIGHT * 0.5
};

var Emitter = function () {
  function Emitter(options) {
    var _this = this;

    _classCallCheck(this, Emitter);

    assign(this, defaults, options);
    this.canvas = document.createElement('canvas');
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.ctx = this.canvas.getContext('2d');

    var nc = document.createElement('canvas');
    this.canvas = document.createElement('canvas');
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.ctx = this.canvas.getContext('2d');

    this.noiseData = this.noiseCanvas.getContext('2d').getImageData(0, 0, this.width, this.height).data;
    this.particles = [];

    this.ctx.fillStyle = 'black';
    this.ctx.fillRect(0, 0, this.width, this.height);
    this.imgdata = this.ctx.getImageData(0, 0, this.width, this.height);
    this.data = this.imgdata.data;
    this.ctx.clearRect(0, 0, this.width, this.height);

    this.hdrdata = new FloatArray(this.data.length);
    times(this.noiseData.length, function (n) {
      _this.hdrdata[n] = 0;
    });
    this.velocity = {
      x: random(-0.5, 0.5, true),
      y: random(-0.5, 0.5, true)
    };

    this.update = this.update.bind(this);
  }

  Emitter.prototype.tonemap = function tonemap(n) {
    return (1 - Math.pow(2, -n * 0.005 * this.exposure)) * 255;
  };

  Emitter.prototype.getNoise = function getNoise(x, y, channel) {
    // ~~  DOUBLE NOT BITWISE OPERATOR
    return this.noiseData[(~ ~x + ~ ~y * this.width) * 4 + channel] / 127 - 1.0;
  };

  Emitter.prototype.update = function update() {
    var _this2 = this;

    if (this.x < 0 || this.x > this.width) {
      return;
    }
    if (this.y < 0 || this.y > this.height) {
      return;
    }

    this.x += this.velocity.x;
    this.y += this.velocity.y;

    var x = this.x;
    var y = this.y;
    var vx = this.vx;
    var vy = this.vy;
    var width = this.width;
    var height = this.height;
    var color = this.color;
    var maxAge = this.maxAge;
    var damping = this.damping;
    var noise = this.noise;
    var fuzz = this.fuzz;
    var intensity = this.intensity;
    var spawn = this.spawn;
    var r = color.r;
    var g = color.g;
    var b = color.b;

    times(spawn, function (n) {
      _this2.particles.push({
        vx: fuzzy(vx),
        vy: fuzzy(vy),
        x: x,
        y: y,
        age: 0
      });
    });

    var alive = [];

    this.particles.forEach(function (p) {
      p.vx = p.vx * damping + _this2.getNoise(p.x, p.y, 0) * 4 * noise + fuzzy(0.1) * fuzz;
      p.vy = p.vy * damping + _this2.getNoise(p.x, p.y, 1) * 4 * noise + fuzzy(0.1) * fuzz;
      p.age++;
      times(10, function (x) {
        p.x += p.vx * 0.1;
        p.y += p.vy * 0.1;
        var index = (~ ~p.x + ~ ~p.y * width) * 4;
        _this2.data[index] = _this2.tonemap(_this2.hdrdata[index] += r * intensity);
        _this2.data[index + 1] = _this2.tonemap(_this2.hdrdata[index + 1] += g * intensity);
        _this2.data[index + 2] = _this2.tonemap(_this2.hdrdata[index + 2] += b * intensity);
      });
      if (p.age < maxAge) {
        alive.push(p);
      }
    });
    this.ctx.putImageData(this.imgdata, 0, 0);
    this.particles = alive;
  };

  return Emitter;
}();

var Smoke = function () {
  function Smoke(container) {
    _classCallCheck(this, Smoke);

    var canvas = container;
    var parentElement = container.parentElement;
    var width = WIDTH;
    var height = HEIGHT;
    console.log(width, height);
    canvas.width = width;
    canvas.height = height;
    var ctx = canvas.getContext('2d');
    var x = canvas.width * 0.5;
    var y = canvas.height * 0.5;
    var noiseCanvas = makeOctaveNoise(width, height, 8);
    var noiseCanvas2 = makeOctaveNoise(width, height, 8);

    var green = new Emitter({
      name: 'left',
      maxAge: 300,
      width: canvas.width,
      height: canvas.height,
      damping: 0.75,
      exposure: 0.05,
      intensity: 1.0,
      noiseCanvas: noiseCanvas
    });

    var green2 = new Emitter({
      name: 'right',
      maxAge: 300,
      width: canvas.width,
      height: canvas.height,
      noiseCanvas: noiseCanvas2,
      damping: 0.75,
      intensity: 2.0,
      exposure: 0.05
    });
    green.x = green2.x = 0;
    green.y = green2.y = y;
    green.velocity.x = 1;
    green2.velocity.x = 1;
    green.velocity.y = green2.velocity.y = 0;
    this.canvas = canvas;
    this.ctx = ctx;
    this.emitters = [green];
    //this.emitters.push(green2, blue2, white2);

    this.update = this.update.bind(this);
    this.loop = this.loop.bind(this);
    this.loop();
  }

  Smoke.prototype.update = function update() {
    var _this3 = this;

    var ctx = this.ctx,
        canvas = this.canvas;

    ctx.globalCompositeOperation = 'normal';
    ctx.fillStyle = 'rgba(5, 15, 16, 1.00)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    this.ctx.globalCompositeOperation = 'lighter';
    this.emitters.forEach(function (emitter) {
      emitter.update();
      _this3.ctx.drawImage(emitter.canvas, 0, 0);
      emitter.ctx.restore();
    });
  };

  Smoke.prototype.loop = function loop() {
    this.update();
    requestAnimationFrame(this.loop);
  };

  return Smoke;
}();

var width = WIDTH;
var height = HEIGHT;

var smoke = new Smoke(document.getElementById('demo'), { width: WIDTH, height: HEIGHT });