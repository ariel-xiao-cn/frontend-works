//Module Name : CourseUI
define(["jquery", "compatibility-ie-8"], function($, comp_ie8) {



    /* megaMenu UI */
    function renderLevel3Mega(element) {
        var menuItem = $(element)[0];
        if (menuItem) {
            var childNode = $(menuItem).children("ul").first();
            //initialize menu
            $(childNode).addClass("inactive");
            //mouseover
            $(menuItem).on("mouseover", function() {
                $(childNode).show();
            });
            //mouseleave
            $(menuItem).on("mouseleave", function() {
                $(childNode).hide();
            });

        }
    }
    /* megaMenu UI end */

    /* dropdown UI */
    function renderMenu(element) {
        var menuItem = $(element)[0];
        if (menuItem) {
            var childNode = $(menuItem).children("nav").first();
            //initialize menu
            $(childNode).addClass("inactive");
            //mouseover
            $(menuItem).on("mouseover", function() {
                $(childNode).show();
            });
            //mouseleave
            $(menuItem).on("mouseleave", function() {
                $(childNode).hide();
            });

        }
    }
    /* dropdown UI end*/

    /* box UI */
    function renderBox(element) {
        var boxItem = $(element)[0];
        if (boxItem) {
            var introPart = $(boxItem).find("p").first();
            var summaryContainer = $(boxItem).find(".summary");
            var summarylistItems = $(boxItem).find(".summary > ul > li");
            var backgroundLayer = $(boxItem).find(".img-wrapper").children(".preview");
            var favoriteIcon = $(boxItem).find(".img-wrapper").children(".favorite");
            var childrenImgs = $(boxItem).find(".img-wrapper").children("*");

            if (summarylistItems) {
                $(favoriteIcon).on("mouseover", function() {
                    favoriteIcon.attr("src", "../../images/jquery-work-02-course/jikexueyuan_course_icon_favorite_hover.png")
                })
                $(favoriteIcon).on("mouseleave", function() {
                    favoriteIcon.attr("src", "../../images/jquery-work-02-course/jikexueyuan_course_icon_favorite.png")
                })
                $(boxItem).on("mouseover", function() {
                    //1. remove other element's hover
                    $(boxItem).addClass("hover");

                    //子元素
                    $(summarylistItems).each(function(index, item) {
                        var cls = $(item).attr("class") + "";
                        if (cls.indexOf("d-hidden") > -1) {
                            $(item).removeClass("d-hidden");
                            $(item).addClass("d-hidden-x");
                        };

                    });
                    //遮罩层
                    $(backgroundLayer).css({
                        "opacity": "0.5"
                    });
                    $(childrenImgs).each(function(index, item) {
                        var cls = $(item).attr("class") + "";
                        if (cls.indexOf("preview") === -1) {
                            $(item).css({
                                "z-index": "99"
                            });
                        }
                    })

                });
                $(boxItem).on("mouseleave", function() {

                    $(boxItem).removeClass("hover");

                    $(summaryContainer).attr("data-fold", "");
                    $(summarylistItems).each(function(index, item) {
                        var cls = $(item).attr("class") + "";

                        if (cls.indexOf("d-hidden-x") > -1) {
                            $(item).addClass("d-hidden");
                        };
                    });
                    $(backgroundLayer).css({
                        "opacity": "1"
                    });
                    $(childrenImgs).each(function(index, item) {
                        var cls = $(item).attr("class") + "";
                        if (cls.indexOf("preview") === -1) {
                            $(item).css({
                                "z-index": "97"
                            });
                        }
                    })
                });

            }
        }
    }

    return {
        asideMega: function(asideConfig) {
            var rootlistOfMega = $("#" + asideConfig.id).find("nav > ul > li");
            $.each(rootlistOfMega, function(index, item) {
                if (++index > asideConfig.active) {
                    $(item).addClass("inactive-x");
                }
            })
            var listOfMega = $("#" + asideConfig.id).find("nav > ul > li > ul > li");
            $.each(listOfMega, function(index, item) {
                renderLevel3Mega(item);
            });
        },
        dropdown: function(dropdownConfig) {
            var listOfMenu = $("#" + dropdownConfig.id).find("li");
            $.each(listOfMenu, function(index, item) {
                if (index % 2 === 1) {
                    $(item).addClass("odd");
                }
                renderMenu(item);
            });

        },
        boxlist: function(boxlistConfig) {
            var box = $("#" + boxlistConfig.id);
            var listOfBox = $("#" + boxlistConfig.id).children("ul > li");
            $.each(listOfBox, function(index, item) {
                //row wrapping
                if ((index + 1) % 3 == 0 && index > 0) {
                    $(item).addClass("wrap");
                }
                renderBox(item);
            });
            //switches 
            var switchListView = $("#" + boxlistConfig.toolbar.list);
            var switchGridView = $("#" + boxlistConfig.toolbar.grid);

            $(switchListView).on("click", function() {
                $(box).removeClass();
                $(box).addClass("list-view");
            });

            $(switchGridView).on("click", function() {
                $(box).removeClass();
                $(box).addClass("box-list box-list-1000-3");
            });

            //switches end
        },
        toolbar: function(toolbarConfig) {
            var button = $("#" + toolbarConfig.scrollToTop.id);
            $(button).on("click", function(){
                window.location.href = "#top";
            })
            window.onscroll = function(){
                if ($(window).scrollTop() === 0) {
                    $(button).css({
                        "display": "none"
                    });
                }
                else{
                    $(button).css({
                        "display":"block"
                    });
                }
            }
  

        },
    };
});
