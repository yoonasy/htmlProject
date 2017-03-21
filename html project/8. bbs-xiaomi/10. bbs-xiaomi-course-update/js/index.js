/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2017-03-18 14:09:40
 * @version $Id$
 */
$(function(){



    /* =============================================== */
    /*  Recommend Event
    /* =============================================== */
    $('.recommend-title span').each(function(i) {
        $(this).mouseover(function() {
            $(this).addClass("on").siblings().removeClass("on");
            $(".recommend-list ul").eq(i).show().siblings().hide();
        })
    });



    /* =============================================== */
    /*  Avatar Mouseenter
    /* =============================================== */
    var timer = 0;
    $('.avatar a').mouseenter(function() {
        $this = $(this);
        timer = setTimeout(loadUser, 500)
        var $avatar = $this.parent('.avatar');
        var $userInfo = $avatar.prev('.author-info');



        /* =========================================== */
        /*  User Info Ajax load
        /* =========================================== */
        function loadUser() {

            function removeLoad() {
                $('.user-load').remove();
            };

            if( $userInfo.length > 0 ) {
                $userInfo.show();
            } else {
                removeLoad();
                $avatar.before( "<p class=\"user-load\">正在加载，请稍后…</p>" );
                var content="<div class=\'author-info\' style=\'display: block;\'>"
                            +"    <div class=\'author-wrap\'>"
                            +"        <div class=\'author-msg\'>"
                            +"            <a href=\'javascript: void(0);\'>"
                            +"                <img src=\'img/0061DN2Vly1fb8muokqesj30qo140n40.jpg\' alt=\'\' width=\'60\' height=\'60\' />"
                            +"            </a>"
                            +"        </div>"
                            +"        <div class=\'user-msg\'>"
                            +"            <a href=\'javascript: void(0);\'>红豆鯊</a>"
                            +"            <p>运营团队</p>"
                            +"        </div>"
                            +"    </div>"
                            +"    <ul class=\'author-exp\'>"
                            +"        <li>"
                            +"            <span>103998</span>"
                            +"            <span>积分</span>"
                            +"        </li>"
                            +"        <li class=\'exp-middle\'>"
                            +"            <span>64913</span>"
                            +"            <span>经验</span>"
                            +"        </li>"
                            +"        <li>"
                            +"            <span>4980</span>"
                            +"            <span>贡献值</span>"
                            +"        </li>"
                            +"    </ul>"
                            +"    <p class=\'badge\'>"
                            +"        <a href=\'javascript: void(0);\' target=\'_blank\'><img src=\'img/87245a238afc65565e3f308119d13ee6.png\' /></a><a href=\'javascript: void(0);\' target=\'_blank\'><img src=\'img/f14ae75f30ef023ea8399b61b9f6d178.png\' /></a><a href=\'javascript: void(0);\' target=\'_blank\'><img src=\'img/8bd8c6493501c63c35549b22311a339e.png\' /></a><a href=\'javascript: void(0);\' target=\'_blank\'><img src=\'img/7586c3e36cd9681bcaae0f71b301302f.png\' /></a><a href=\'javascript: void(0);\' target=\'_blank\'><img src=\'img/a988769bc8e68f71e3cae2ccf81677ae.png\' /></a><a href=\'javascript: void(0);\' target=\'_blank\'><img src=\'img/0425052c75e8c842c65b0758d7df07aa.png\' /></a><a href=\'javascript: void(0);\' target=\'_blank\'><img src=\'img/7dfe7d5d3677f5c554efe370c417293a.png\' /></a><a href=\'javascript: void(0);\' target=\'_blank\'><img src=\'img/e9eadfc2afce2ae044f1b167947bb90d.png\' /></a><a href=\'javascript: void(0);\' target=\'_blank\'><img src=\'img/453ff7656354057229e29f38f4716afa.png\' /></a><a href=\'javascript: void(0);\' target=\'_blank\'><img src=\'img/723da9a8881e737a12e7c6798d106e97.png\' /></a><a href=\'javascript: void(0);\' target=\'_blank\'><img src=\'img/1e0580a66451815031a3286cef8a572f.png\' /></a><a href=\'javascript: void(0);\' target=\'_blank\'><img src=\'img/29099e6b900453c066b26ee6124e9735.png\' /></a><a href=\'javascript: void(0);\' target=\'_blank\'><img src=\'img/2193b4bbad8c7de6b7805bd5b436b03b.png\' /></a><a href=\'javascript: void(0);\' target=\'_blank\'><img src=\'img/3a5a3dc850a0b29a0fdd5a614770361d.png\' /></a><a href=\'javascript: void(0);\' target=\'_blank\'><img src=\'img/b6830b44100ec193e3252cc5c20943a6.png\' /></a><a href=\'javascript: void(0);\' target=\'_blank\'><img src=\'img/6d86d8c740db633671e05fd80455dd99.jpg\' /></a>"
                            +"    </p>"
                            +"</div>";




                /* =================================== */
                /*  Ajax Definition
                /* =================================== */
                var user = {
                    "url": "#",
                    "type": "GET",
                    "success": function(data) {
                        removeLoad();
                        $avatar.before( content );
                    },
                    "error": function() {
                        $('.user-load').html("加载失败，请稍后再试…");
                        setTimeout(removeLoad, 2000);
                    }
                }
                // $.ajax( user );



                /* =================================== */
                /*  Localhost test
                /* =================================== */
                removeLoad();
                $avatar.before( content );
            };
        };// ---Load User



        /* =========================================== */
        /*  MouseLeave Cancle User Info
        /* =========================================== */
        $this.mouseleave(function() {
            clearTimeout( timer );
        });

    });// ---Avatar Mouseenter



    /* =============================================== */
    /*  UserInfo Hide
    /* =============================================== */
    // Binding Parent li
    $('#themelist li').on("mouseleave", ".author-info", function() {
        $(this).hide();
    });

});

