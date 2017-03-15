/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2017-03-07 15:05:12
 * @version $Id$
 */

/* ------------------------------------------------------------------ */
/*    File
/* ------------------------------------------------------------------ */
$('input[type=button]').click(function(){
    if (window.File && window.FileReader && window.FileList && window.Blob) {
        console.log( 'browser ok' )
        $('#files').click();

    } else {
        showOverlay("Your current browser does not support file uploads\n\rPlease update or change a browser\n\rIt is recommended to use Google/firefox");
        // alert('Your current browser does not support file uploads\n\rPlease update or change a browser\n\rIt is recommended to use Google/firefox')
        return;
    }
})

function addData(json) {
    json = eval( "("+json+")" );
    json.size = (json.size/(1024*1024)).toFixed(3);
    json.size = parseInt(json.size) ? Number(json.size).toFixed(1)+"MB" : json.size*1024+"KB";
    var html = "<div class=\'file-content bounceIn\'>"+
    "                    <div class=\'file-name\'>"+json.filename+"</div>"+
    "                    <div class=\'file-size\'>"+json.size+"</div>"+
    "                    <div class=\'file-date\'>"+json.date+"</div>"+
    "                    <div class=\'file-link\' style=\'padding-right: 46px;\'> <a id=\'link\' href=\'/disk/index.html\'>http://xx/xx/xx</a>"+
    "                 "+
    "                    </div>"+
    "                    <button data-clipboard-target=\'#link\'>Copy</button>"+
    "                </div>"
    $(".show-file").append( html ).show();
    $("#files-info").val( "当前上传进度为：100%" );
};

function handleFileSelect(e){
    var files = e.target.files;
    var output = [];
    var maxSize = 500;
    var xhr = new XMLHttpRequest();

    for (var i=0, f; f = files[i]; i++) {
        // output.push( escape(f.name), "===", f.size, "===", f.lastModifiedDate.toLocaleDateString() )
        if ( parseInt(f.size) >= maxSize*Math.pow(1024, 2) ) {

            console.log( parseInt(output[2]) );
            $('#files-info').val( '当前限制上传文件大小不超过'+maxSize+'MB' );
            showOverlay('当前限制上传文件大小不超过'+maxSize+'MB');

            files = null;
            output = [];
            $('#files').val("");

        } else {
            console.log('=======size-ok:'+parseInt(output[2]))
            xhr.open( "post", "/disk/index.html", true );
            xhr.onreadystatechange = function() {
                if( xhr.status ==200 ) {
                    if( xhr.readyState ==4 ) {
                        // console.log(xhr.responseText);
                        addData( xhr.responseText );
                    }
                }
            };
            xhr.upload.onprogress = function(event){
                event = event || window.event
                // event object update-info;
                var pre = Math.floor(99 * parseFloat(event.loaded) / parseFloat(event.total));
                $("#files-info").val( "当前上传进度为：" + pre + "%" );
            }
            var sData = new FormData();
            sData.append( "file", f)
            xhr.send( sData )
            

            break
        }
        $('#files').val("");
        files = null; output = [];
    }
}
document.getElementById('files').addEventListener('change', handleFileSelect, false);



/* ------------------------------------------------------------------ */
/*    Heart
/* ------------------------------------------------------------------ */
$('#h-animate').css({
    top: $(document).height() / 2.7 + 'px'
});
$('#h-animate').css({
    'margin-left': -$('#h-animate').width() / 2 + 'px'// startPage heart
});

// hover
$('#h-animate').mouseenter(function() {
    $('#h-animate').css({
        'margin': 'auto',
        'width': 'auto'
    });
    var offset = $(this).offset();
    $(this).html("&#10084;"); //Change heart
    // Get heart W/H
    var spanWidth = $(this).width();
    var spanHeight = $(this).height();

    var width = $(document).width() - spanWidth - 10; //-10 due to font adjustment 
    var height = $(document).height() - spanHeight - 10; //-10 due to font adjustment
    // random W/H
    var x = (Math.random() * width);
    var y = (Math.random() * height);

  //Ensure new position will not accidently be under mouse again
    while (x >= (offset.left - spanWidth / 4) && x <= (offset.left + spanWidth)) {
        x = (Math.random() * width);
    }
    while (y >= (offset.top - spanHeight / 4) && y <= (offset.top + spanHeight)) {
        y = (Math.random() * height);
    }
    var randomR = parseInt(Math.random()*255);
    var randomG = parseInt(Math.random()*255);
    var randomB = parseInt(Math.random()*255);
    var randomO = Math.random() + 0.01
    var randomColor = "rgba("+randomR+","+randomG+","+randomB+","+randomO+")"
    $(this).css('left', x);
    $(this).css('top', y);
    $(this).css('color', randomColor)
});

// resizing position
$(window).resize(function() {
    $('#h-animate').css({
        top: $(document).height() / 3 + 'px'
    });
    $('#h-animate').css({
        'left': "50%"
    });
    $('#h-animate').css({
        'margin-left': -$('#h-animate').width() / 2 + 'px'
    });
});



/* ------------------------------------------------------------------ */
/*    BackGround
/* ------------------------------------------------------------------ */
$('body').vegas({
    overlay: 'img/overlay.png',
    slides: [
        // { src: 'img/banner8.jpg' },
        // { src: 'img/banner7.jpg' },
        // { src: 'img/banner6.jpg' },
        // { src: 'img/banner5.jpg' },
        // { src: 'img/banner4.jpg' },
        { src: 'img/bannerq3.jpg' },
        { src: 'img/bannerq2.jpg' },
        { src: 'img/bannerq1.jpg' },
    ],
})



/* ------------------------------------------------------------------ */
/*    Page-Loader
/* ------------------------------------------------------------------ */
// Wait for window load
$(window).load(function() {
// Animate loader off screen
    $(".page-loader").fadeOut( "slow" );
    
    new WOW().init();

    // new Clipboard($('button')[0]);
});



/* ------------------------------------------------------------------ */
/*    Shade
/* ------------------------------------------------------------------ */
function showOverlay(info, buttt) {
    info = info || "您有消息~";
    buttt = buttt || "OK";
    $("#ok").html( buttt );
    $('.text-info').html( info );
    $(".popup-window").fadeIn(500);
    // To prevent the failure CSS
    setTimeout("$('.stick').toggleClass(function() {return $(this).is('.open, .close') ? 'open close' : 'open'})",400)
};



    /* -------------------------------------------------------------- */
    /*    Shade/1. window.animate
    /* -------------------------------------------------------------- */
    $(document).ready(function() {
        function hideOverlay() {
            $("#shade").animate( {"top": "100px"}, 50, function() {
                $(this).animate( {"top": "-999px"}, 200, function() {
                    $(".popup-window").fadeOut(300, function() {
                        $("#shade").css({"top":"0"});
                    });
                });
            })

        };
        $(".shade-container").click(function() {
            // To prevent the failure CSS
            $(".stick").toggleClass(function () {
                if($(this).is('.open, .close')){ hideOverlay()
                    return 'open close';
                };
                return $(this).is('.open, .close') ? 'open close' : 'open';
            });
            return false;
        });
        $(".popup-window").click( function(){
            // To prevent the failure CSS
            $(".stick").toggleClass(function () {
                if($(this).is('.open, .close')){ hideOverlay()
                    return 'open close';
                };
                return $(this).is('.open, .close') ? 'open close' : 'open';
            });
            return false;   
        });

    });

