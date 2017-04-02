var demo = document.getElementById("demo");
var tl = new TimelineMax({repeat:-1});
var ease = Linear.easeNone;

TweenMax.set(demo, {autoAlpha:1});
TweenMax.set("path", {drawSVG:0, stroke:"#42a6e0"});
TweenMax.set("ellipse", {autoAlpha:0, fill:"#42a6e0"});

tl.to("#hPipe", 0.35, {drawSVG:true, ease:ease});
tl.to("#hBody", 0.75, {drawSVG:true, ease:ease});
tl.to("#mainPath", 5, {drawSVG:true, ease:ease});
tl.to("#dot2", 0.15, {autoAlpha:1});
tl.to("#dot1", 0.15, {autoAlpha:1});
tl.to("#tCross", 0.25, {drawSVG:true, ease:ease});
tl.to("path, ellipse", 0.75, {autoAlpha:0}, "+=1");