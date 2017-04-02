'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*********
* REACT
**********/

var Sinus = function (_React$Component) {
  _inherits(Sinus, _React$Component);

  function Sinus() {
    _classCallCheck(this, Sinus);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this));

    _this.state = {
      degree: 0
    };

    setInterval(_this._tick.bind(_this), 30);
    return _this;
  }

  Sinus.prototype._tick = function _tick() {
    if (this.state.degree < 360) {
      this.setState({ degree: this.state.degree + 1 });
    } else {
      this.setState({ degree: 0 });
    }
  };

  Sinus.prototype.render = function render() {
    return React.createElement(SinusDraw, { degree: this.state.degree });
  };

  return Sinus;
}(React.Component);

var SinusDraw = function SinusDraw(_ref) {
  var degree = _ref.degree;
  return React.createElement(
    'div',
    { id: 'container' },
    React.createElement(
      'svg',
      { width: '940', height: '240', xmlns: 'http://www.w3.org/2000/svg' },
      React.createElement(
        'g',
        { transform: 'translate(20 20)' },
        React.createElement(
          'text',
          { x: '0', y: '100' },
          'sin('
        ),
        React.createElement('line', { className: 'grey', x1: Math.cos(degree / 180 * Math.PI) * 100 + 100 + 110, y1: -Math.sin(degree / 180 * Math.PI) * 100 + 100,
          x2: degree + 460, y2: -Math.sin(degree / 180 * Math.PI) * 100 + 100 }),
        React.createElement(
          'g',
          { transform: 'translate(110 0)' },
          React.createElement('line', { className: 'grey', x1: '100', y1: '100', x2: '200', y2: '100' }),
          React.createElement('circle', { className: 'grey', cx: '100', cy: '100', r: '100' }),
          React.createElement('path', { d: 'M 130 100 A 30 30 0 ' + (degree <= 180 ? '0' : '1') + ' 0' + (Math.cos(degree / 180 * Math.PI) * 30 + 100) + ' ' + (-Math.sin(degree / 180 * Math.PI) * 30 + 100) }),
          React.createElement('line', { className: 'grey', x1: '100', y1: '100', x2: Math.cos(degree / 180 * Math.PI) * 100 + 100, y2: -Math.sin(degree / 180 * Math.PI) * 100 + 100 }),
          React.createElement(
            'text',
            { x: Math.cos(degree / 180 * Math.PI) * 100 + 100 + 10, y: -Math.sin(degree / 180 * Math.PI) * 100 + 100 },
            degree,
            '°'
          )
        ),
        React.createElement(
          'text',
          { x: '370', y: '100' },
          ') ='
        ),
        React.createElement(
          'g',
          { transform: 'translate(460 0)' },
          React.createElement('line', { className: 'grey', x1: '0', y1: '100', x2: '360', y2: '100' }),
          React.createElement('polyline', { className: 'grey',
            points: Array.from({ length: 360 }, function (value, key) {
              return key + " " + (-Math.sin(key / 180 * Math.PI) * 100 + 100);
            }) }),
          React.createElement('polyline', {
            points: Array.from({ length: degree }, function (value, key) {
              return key + " " + (-Math.sin(key / 180 * Math.PI) * 100 + 100);
            }) }),
          React.createElement(
            'text',
            { x: degree + 10, y: -Math.sin(degree / 180 * Math.PI) * 100 + 100 },
            parseFloat(Math.sin(degree / 180 * Math.PI)).toFixed(4)
          )
        )
      )
    )
  );
};

ReactDOM.render(React.createElement(Sinus, null), document.getElementById('app'));