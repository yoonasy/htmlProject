$(document).mousemove(function(e) {
  var $width = ($(document).width()) / 255;
  var $height = ($(document).height()) / 255;
  var $X = parseInt(e.pageX / $width);
  var $Y = parseInt(e.pageY / $height);
  var $Z = parseInt(e.pageX / Math.random(), 10);
  $("p").css("color", "rgb(" + $X + "," + $Y + "," + $X + ")");
});