define(['app/observer', 'app/localStorageManager'], function($, configManager) {




    /* ------------抽象工厂模式--------- */
    //抽象工厂 - uiManager
    var uiManager = function() {};
    uiManager.prototype = {
        update: function() {
            throw new error("not implemented");
        },
        reset: function(){
             throw new error("not implemented");
        }
    }

    //实现类 1, 继承uiManager
    var backgroundManager = function() {
        var mgr = new configManager(); //local storage service
        this.prototype = new uiManager;
        this.prototype.constructor = uiManager;
        this.update = function(e, newBackground, newOpacity) {

            //-----------------------业务逻辑-------------------//
            //业务1 更新背景及导航栏 logo
            if (newBackground) {
                var container = $(".container");
                $(container).css({
                    "background": "url(" + newBackground + ")",
                    "background-position": "center 0",
                    "background-repeat": "no-repeat",
                    "background-size": "cover"
                });
                //3 set header
                $(".container > header").addClass("theme-header");
                //4 set logo
                $(".logo > img").attr({
                    "src": "../images/baidu_jquery_theme_logo.png"
                });

                $(".logo").css({
                    "width": "270px",
                    "height": "129px"
                });
                $(".logo > img").css({
                    "max-width": "270px"
                });
                //5. set footer
                $(".container > footer").addClass("ending-theme");

                //save 
                mgr.config("SITE_CONFIG_IMG", newBackground);

            }
            if (newOpacity) {
                //业务2 更新tab栏透明度
                $(".opacity-bar").show();
                $("*[data-type='default-skin']").show();
                var dropdown = $("nav[data-type='toggle']").first();
                //opacity
                $(".main-content").css({
                    "opacity": newOpacity
                });

                $(".opacity-result").text(Math.floor(newOpacity * 100) + "%");

                //search button bg
                $("#search-form button").addClass("theme-button");

                //save 
                mgr.config("SITE_CONFIG_OPACITY", newOpacity);

            }
            //-----------------------业务逻辑-------------------//
        },
        this.reset = function(){

            var container = $(".container");
            $(container).css({
                "background": "#fff"
            });
            $(".container > header").removeClass("theme-header");
            $(".logo > img").attr({
                "src": "../images/plus_logo.png"
            });
            $(".logo").css({
                "width": "217px",
                "height": "70px"
            });
            $(".logo > img").css({
                "max-width": "217px"
            });

            $(".container > footer").removeClass("ending-theme");
            //
            $(".main-content").css({
                "opacity": "1"
            });
            $(".opacity-bar").hide();
            $("*[data-type='default-skin']").hide();

            //search button bg
            $("#search-form button").removeClass("theme-button");

            //save
            mgr.remove("SITE_CONFIG_IMG");
            mgr.remove("SITE_CONFIG_OPACITY");
        }
    }


    return {
        subscribe: function() {
            var bgMgr = new backgroundManager();
            $.subscribe("theme-change", bgMgr.update);
            $.subscribe("theme-reset", bgMgr.reset);

        },
        initialize: function(){
            
            var mgr = new configManager();
            var background = mgr.config("SITE_CONFIG_IMG");
            var opacity = mgr.config("SITE_CONFIG_OPACITY");

            $.publish("theme-change", [background, opacity]);
        }

    }
})