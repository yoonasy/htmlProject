/**
 * 
 * @yoonasy (yoonasy@qq.org)
 * @date    2017-01-10 15:42:03
 * @version $1$
 */

$(function(){
    // 循环绑定 inputDom事件
    for(var i=0; i<2; i++){
        var n = i ? ".order" : ".nick"
        $(n).focus(action);
        $(n).blur(leisure);
    };

})

// 获取焦点
function action(){
    // 执行图片动画
    if( this.className == "nick" ){
        $(".operate-img").css({marginLeft:140,width:0,height:0}).stop().animate({marginLeft:220,width:527,height:301,opacity:1}, 600) 
        }else{
            $(".order-img").css({width:0,height:0}).stop().animate({width:838,height:142,opacity:1}, 600)
        }

    // 执行盒子动画
    $(".focus").css({display:"block",width:0,height:0}).stop().animate({width:900,height:333,marginLeft: 0, marginTop: 0,opacity:1}, 600)
};

// 失去焦点
function leisure(){
    // 让之前动画停止，防止动画结束前失去焦点，改变其初始位置、
    $(".focus").stop()
    // 图片 名字判断隐藏（防止溢出）
    var name = this.className == "nick" ? ".operate-img" : ".order-img"
    $(name).css({display:"none"})
    // 回归初始位置
    $(".focus").css({display:"none",marginLeft:400,marginTop:30,opacity:0})
};