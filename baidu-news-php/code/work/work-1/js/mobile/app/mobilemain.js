define(['jquery','config'], function($, config) {


    var defaultPagerConfig = {
        pageCount: 4,
        startIndex: 0
    }

    var defaultSearchConfig = {
        newsType: 1,
    }

    function switchNav(id) {
        var PagerConfig = {
            pageCount: 4,
            startIndex: 0
        }

        var SearchConfig = {
            newsType: id,
        }

        loadNews(PagerConfig, SearchConfig);
    }



    $("#loadMore").on("click", function() {
        var newsCount = $("#news-window").children("li").length;
        var curActive = $("#nav-list").find("li.active > a").attr("data-id");
        var PagerConfig = {
            pageCount: 4,
            startIndex: newsCount,
            persist: true
        }

        var SearchConfig = {
            newsType: curActive,
        }

        loadNews(PagerConfig, SearchConfig);
    })

    function translateTime(time) {
        var now = new Date();
        time = time.replace('-', '/');
        var newsTime = new Date(time.replace('-', '/'));
        var newsTimeHour = newsTime.getHours();
        var newsTimeDay = newsTime.getDate();
        var newsTimeMonth = newsTime.getMonth();
        var newsTimeYear = newsTime.getFullYear();


        var nowTimeHour = now.getHours();
        var nowTimeDay = now.getDate();
        var nowTimeMonth = now.getMonth();
        var nowTimeYear = now.getFullYear();

        var timeSpan = now - newsTime;
        if (newsTimeYear === nowTimeYear && newsTimeMonth === nowTimeMonth && newsTimeDay === nowTimeDay) {
            var hours = nowTimeHour - newsTimeHour;
            if (hours <= 1) {
                return "刚刚";
            } else {
                return hours + "小时前"
            }
        } else {
            return newsTimeYear.toString() + "-" + newsTimeMonth.toString() + "-" + newsTimeDay.toString();
        }
    }

    function loadNavs() {
        //get news data
        $.ajax({
            type: "get",
            dataType: "json",
            url: config.serviceUrl + "getNewsType.php",
            success: function(data) {
                refreshNavUI(data);
                //console.log(data);
            },
            error: function(err) {
                console.log(err.msg)
            }
        });
    }

    function loadNews(pagerParam, searchParam) {
        var queryParam = {
                pageCount: pagerParam.pageCount,
                startIndex: pagerParam.startIndex,
                newsType: searchParam.newsType,
            }
            //get news data
        $.ajax({
            type: "post",
            dataType: "json",
            data: queryParam,
            url: config.serviceUrl + "getNews.php",
            success: function(data) {
                if(data.length == 0){
                    $("#loadMore").onclick = null;
                    $("#loadMore").addClass("unavailable");
                    $("#loadMore").text("已经没有更多新闻");
                }
                refreshUI(data, pagerParam);

                //console.log(data);
            },
            error: function(err) {
                console.log(err.msg)
            }
        });

    }

    function refreshNavUI(data) {
        var navList = $("#nav-list");
        $(navList).empty();

        data.forEach(function(element, index) {
            var row = $("<li>");
            /* NEWS TITLE */
            var tdNavItem = $("<a>", {
                text: element["news_type_name"]
            });

            $(tdNavItem).attr("data-id", element["id"]);
            if (index === 0) {
                $(row).addClass("active");
            }

            $(tdNavItem).on("click", function() {
                switchNav(element["id"]);
                $(row).addClass("active");
                $(row).siblings().removeClass("active");
            })

            $(row).append(tdNavItem);

            $(navList).append(row);

        });
    }

    function refreshUI(data, pagerParam) {
        //data binding
        var newsContainer = $("#news-window");
        if (!pagerParam.persist) {
            $(newsContainer).empty();
        }

        data.forEach(function(element, index) {
            var row = $("<li>");
            /* NEWS TITLE */
            var tdSourceTag = $("<img>", {
                src: element["news_img_url"]
            });
            var tdTitle = $("<p>", {
                class: "news-title",
                text: element["news_title"]
            });
            var tdTag = $("<div>", {
                class: "tags"
            });

            var timeSpan = $("<span>", {
                class: "news-create-on",
                text: translateTime(element["created_on"])
            });



            var sourceSpan = $("<span>", {
                class: "news-source",
                text: element["news_source"]
            });

            $(tdTag).append(timeSpan);
            $(tdTag).append(sourceSpan);


            $(row).append(tdSourceTag);
            $(row).append(tdTitle);
            $(row).append(tdTag);

            $(newsContainer).append(row);



        });
    }

    loadNavs();
    loadNews(defaultPagerConfig, defaultSearchConfig);



})
