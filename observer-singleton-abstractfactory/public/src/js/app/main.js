define(['app/theme', 'app/observer'], function(themeManager, $) {




    $().ready(function() {

        
        themeManager.subscribe();
        themeManager.initialize();



        //透明度控件 事件绑定
        (function() {

            var isMouseDown = false;
            $("#opacity-rec").on("mousedown", function(e) {
                isMouseDown = true;
                var curLeft = e.pageX - parseInt($(this).css("left"));
                $("#opacity-rec").on("mouseup", function() {
                    isMouseDown = false;
                });

                $("#opacity-rec").on("mousemove", function(eNew) {
                    var moveVector = eNew.pageX - curLeft;
                    if (moveVector < 0) {
                        moveVector = 0;
                    } else if (moveVector > 100) {
                        moveVector = 100;
                    }
                    if (isMouseDown) {
                        $(this).css({
                            "left": moveVector + "px"
                        });
                        var opacity = parseFloat(moveVector / 100, 2);
                        //改变透明度publish新的theme-change
                        $.publish("theme-change", [null, opacity])
                    }
                });

            });
        })();


        //侧边下拉菜单 事件绑定
        (function() {

            var triggerOfDropdown = $("a[data-type='trigger-toggle']").first();
            var dropdown = $("nav[data-type='toggle']").first();
            dropdown.hide();
            triggerOfDropdown.on("mouseenter", function() {
                dropdown.slideDown("slow");
            });
            dropdown.on("mouseleave", function() {
                dropdown.slideUp("slow");
            })
        })();

        //切换面板 事件绑定
        (function() {

            var displayScreen = $("div[data-type='current-display']");
            var availableTabs = $(".tab").children("article");
            var tabControls = $("nav[data-type='tab-controls'] ul li");
            tabControls.each(function() {

                $(this).on("click", function() {
                    $(this).addClass("active");
                    $(this).siblings().each(function() {
                        $(this).removeClass("active");
                    });
                    var idTab = "#" + $(this).attr("data-tab");
                    var referredTab = $(idTab);
                    $(displayScreen).html($(referredTab).html());
                    //foldable
                    var foldable = $(".foldable").first();
                    var foldableSiblings = foldable.siblings("nav");
                    $(foldable).on("click", function() {
                        foldableSiblings.slideToggle(500);
                    });
                });

            });
        })();

        //initialize
        $("li[data-tab='myFavor']").click();

        //skin change

        //1. menu
        $("#skinSwap").on("click", function() {
            $("#theme-changer").slideDown(500).fadeIn(500);
            //add a mask
            var maskLayer = $("<div class='mask'></div>");
            $(maskLayer).on("click", function() {
                $("#theme-changer").slideUp(500);
                $(".mask").remove();
                $(".container").css({
                    "overflow": "auto"
                })
            });
            $(".container").css({
                "overflow": "hidden"
            })
            $(".container > header").prepend(maskLayer);
        });



        // 2. 切换背景 
        // 观察者模式 进行发布新通知
        // 点击背景图片, 向所有subscribe"theme change"
        // 的对象发送信息 
        $(".avaThemes li > a").each(function() {
            var imgSrc = $(this).children("img").attr("src");
            var opacity = parseInt($(".opacity-result").text()) / 100;
            if (opacity == 0) {
                opacity = 1;
            }
            $(this).on("click", function() {
                $.publish("theme-change", [imgSrc, opacity]); //发布

            })

            $(this).on("mouseover", function() {
                var previewWindow = $(".preview-tab");
                previewWindow.css({
                    "background": "url(" + imgSrc + ")",
                    "background-repeat": "no-repeat",
                    "background-size": "cover"
                })
            });
        });

        //3 set main tab
        $("#theme-changer > header > ul > li").not(".opacity-bar").not(".tools").each(function() {
            $(this).on("click", function() {
                $(this).addClass("active");
                $(this).siblings("*").removeClass("active");
            })
        });
        //fold the menu
        $("*[data-type='clip']").on("click", function() {
            $("#theme-changer").slideUp(500);
            $(".mask").remove();
            $(".container").css({
                "overflow": "auto"
            })
        });
        //swip to default skin
        $("*[data-type='default-skin']").on("click", function() {
            $.publish("theme-reset");
        });


        $("#theme-changer > header > ul > li").first().addClass("active");


    });
})