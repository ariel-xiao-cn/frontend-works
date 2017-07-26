var dropdown;
var triggerOfDropdown;
var availableTabs;
var tabControls;
var displayScreen;
/* Local Storage Definitions */
/* 1. SITE_CONFIG - 网站配置  key-value集合字符串 */
var configs = [];

/* 提示信息预定义 */
var ERROR_HEADING = "提示 - 发生错误";
var INFO_HEADING = "提示 - 一般信息"

var INFO_01 = "浏览器已支持 Web Storage.";
var INFO_02 = "SITE_CONFIG - 已切换主题为 - ";
var INFO_03 = "SITE_CONFIG - 初始化主题为 - ";
var INFO_04 = "SITE_CONFIG - 读取结果 - ";
var ERROR_01 = "浏览器不支持Web Storage或禁用了Web Storage."
var ERROR_02 = "该元素为null."
var MSG_CONNECTOR = " : ";

supportChecking();

//定义:检查local storage兼容性
//返回值false : 不支持或其他原因不允许使用local storage
//返回值true  : 可以使用local storage
function supportChecking() {
    var msg = "";
    try {
        if (!window.localStorage) {
            msg = ERROR_HEADING + MSG_CONNECTOR + ERROR_01;
            alert(msg);
            return false;

        } else {
            msg = INFO_HEADING + MSG_CONNECTOR + INFO_01;
            return true;
        }
    } catch (ex) {
        msg = ERROR_HEADING + MSG_CONNECTOR + ex.message;
        alert(msg);
        return false;
    }

}

//定义:加载本地配置
//返回值 1: 已解析本地配置文件
//返回值 2：本地允许配置 但暂无配置
//返回值 3：本地浏览器原因，导致不允许/不支持配置
function loadConfig() {
    if (supportChecking) {
        var configString = localStorage.getItem("SITE_CONFIG_IMG");
        //如果有预设配置, 解析配置
        if (configString) {
            configs = configString.split(';');
            //console.log(INFO_HEADING + MSG_CONNECTOR + INFO_04 + configString);
            return 1;
        }
        //如果没有, 允许更新配置
        else {
            return 2;
        }
    } else {
        return 0;
    }
}

function setThemeToHtml(imgSrc, opacity) {
    document.body.setAttribute("data-theme", imgSrc);
    var container = $(".container");
    if (imgSrc !== "") {
        //1 change theme
        $(".opacity-bar").show();
        $("*[data-type='default-skin']").show();
        //2 set background
        $(container).css({
            "background": "url(" + imgSrc + ")",
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
        //opacity
        $(".main-content").css({
            "opacity": opacity
        });

        $("#opacity-rec").css({
            "left": opacity*100 + "px"
        });
        $(".opacity-result").text(opacity*100 + "%");

        //search button bg
        $("#search-form button").addClass("theme-button");

        dropdown.hide();
    } else {
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

        dropdown.hide();
    }
}



//定义:初始化本地配置
function initializeConfig(name, value, opacity) {
    var valueToSet = "";
    valueToSet = name + ":" + value;
    localStorage.setItem("SITE_CONFIG_IMG", valueToSet);
    localStorage.setItem("SITE_CONFIG_OPACITY", opacity);
    setThemeToHtml(value, opacity);
    //console.log(INFO_HEADING + MSG_CONNECTOR + INFO_03 + value);
}

//定义:更新本地配置
function updateConfig(name, value, opacity) {
    var valueToSet = "";
    valueToSet = name + ":" + value;
    localStorage.setItem("SITE_CONFIG_IMG", valueToSet);
    localStorage.setItem("SITE_CONFIG_OPACITY", opacity);
    setThemeToHtml(value, opacity);
    //log
    //console.log(INFO_HEADING + MSG_CONNECTOR + INFO_02 + value);
}

function updateOpacity(opacity) {
    localStorage.setItem("SITE_CONFIG_OPACITY", opacity);
}


function switchTheme(themeVal, opacity) {
    var localSetting = loadConfig();

    switch (localSetting) {
        case 1:
            // 已有配置 -> 使用updateConfig 更新配置         
            updateConfig('theme', themeVal, opacity);
            break;
        case 2:
            // 没有配置 -> 使用 initializeConfig　初始化配置
            initializeConfig('theme', themeVal, opacity);
            break;
        case 0:
            // 不允许配置 -> 提示
            console.log(ERROR_HEADING + MSG_CONNECTOR + ERROR_01);
            break;
        default:
            // statements_def
            break;
    }
}



function renderByConfig() {
    if (configs.length > 0) {
        var theme = configs[0].split(':')[1];
        var opacity = localStorage.getItem("SITE_CONFIG_OPACITY", opacity);
        if (opacity) {
            setThemeToHtml(theme, opacity);
        } else {
            setThemeToHtml(theme, 1);
        }
    }
}




$().ready(function() {

    $(window).on("load", function() {
        loadConfig();
        renderByConfig();
    })

    //opacity

    var isMouseDown = false;
    var tempX = 0;


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
                $(".opacity-result").text(moveVector + "%");
                //apply opacity change
                $(".main-content").css({
                    "opacity": moveVector / 100
                });

                updateOpacity(moveVector / 100);
            }
        });

    });








    triggerOfDropdown = $("a[data-type='trigger-toggle']").first();
    dropdown = $("nav[data-type='toggle']").first();
    dropdown.hide();
    triggerOfDropdown.on("mouseenter", function() {
        dropdown.slideDown("slow");
    });
    dropdown.on("mouseleave", function() {
        dropdown.slideUp("slow");
    })


    //tabs
    displayScreen = $("div[data-type='current-display']");
    availableTabs = $(".tab").children("article");
    tabControls = $("nav[data-type='tab-controls'] ul li");
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
        //
        dropdown.hide();
    });



    //2. background swip
    $(".avaThemes li > a").each(function() {
        var imgSrc = $(this).children("img").attr("src");
        var opacity = parseInt($(".opacity-result").text()) / 100;
        if (opacity == 0) {
            opacity = 1;
        }
        $(this).on("click", function() {
            switchTheme(imgSrc, opacity);

        })

        $(this).on("mouseover", function() {
            var previewWindow = $(".preview-tab");
            previewWindow.css({
                    "background": "url(" + imgSrc + ")",
                    "background-repeat": "no-repeat",
                    "background-size": "cover"
                })
                //   
            dropdown.hide();
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
        switchTheme("", 1);
        updateOpacity(1);
    });


    $("#theme-changer > header > ul > li").first().addClass("active");


});
