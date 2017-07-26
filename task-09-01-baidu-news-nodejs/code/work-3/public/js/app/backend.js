define(['app/backendFramework', 'bootstrap.min', 'config'], function(backfrm, bootstrap, config) {


    function bindEvents() {


        bindNewsType("newsType");
        bindNewsType("newsTypeUpdate");
        bindNewsType("newsTypeSearch");


        //create news.
        //UI
        $("*[data-opt='insert-news']").on("click", function() {
            var insertPage = $("#insert-news");
            $(insertPage).removeClass("hidden");
            $("#overview").empty();
            $("#overview").append(insertPage);
        })

        //Business
        $("#news-form-submit").on("click", function(e) {
            e.preventDefault();
            var newsType = $("#newsType").val();
            var newsTitle = $("#newsTitle").val();
            var newsSource = $("#newsSource").val();
            var newsImage = $("#newsImage").val();

            if (!newsType || newsTitle === "" || newsSource === "" || newsImage === "") {
                if (!newsType) {
                    $("#newsType").parent().addClass("has-error");
                }
                if (newsTitle === "") {
                    $("#newsTitle").parent().addClass("has-error");
                }
                if (newsSource === "") {
                    $("#newsSource").parent().addClass("has-error");
                }
                if (newsImage === "") {
                    $("#newsImage").parent().addClass("has-error");
                }
            } else {
                var jsonNews = {
                    newsTitle: newsTitle,
                    newsType: newsType,
                    newsImage: newsImage,
                    newsSource: newsSource
                }
                insertNews(jsonNews);
            }
        })


                        //Business
                $("#news-form-update-submit").on("click", function() {
                    var newsType = $("#newsTypeUpdate").val();
                    var newsTitle = $("#newsTitleUpdate").val();
                    var newsSource = $("#newsSourceUpdate").val();
                    var newsImage = $("#newsImageUpdate").val();
                    var newsId = $("#newsId").val();

                    if (!newsType || newsTitle === "" || newsSource === "" || newsImage === "") {
                        if (!newsType) {
                            $("#newsTypeUpdate").parent().addClass("has-error");
                        }
                        if (newsTitle === "") {
                            $("#newsTitleUpdate").parent().addClass("has-error");
                        }
                        if (newsSource === "") {
                            $("#newsSourceUpdate").parent().addClass("has-error");
                        }
                        if (newsImage === "") {
                            $("#newsImageUpdate").parent().addClass("has-error");
                        }
                    } else {
                        var jsonNews = {
                            newsId: newsId,
                            newsTitle: newsTitle,
                            newsType: newsType,
                            newsImage: newsImage,
                            newsSource: newsSource
                        }
                        updateNews(jsonNews);
                    }
                });

        //search button
        $("#news-form-search-submit").on("click", function() {
            var newsSource = $("#newsSourceSearch").val();
            var newsTitle = $("#newsTitleSearch").val();
            var newsType = $("#newsTypeSearch").val();
            var searchConfig = {
                newsSource: newsSource,
                newsTitle: newsTitle,
                newsType: newsType
            };

            $.ajax({
                url: config.serviceUrl + 'News',
                type: 'post',
                data: searchConfig,
                dataType: 'json',
                success: function(response) {
                    refreshUI(response);
                }
            })
        })

    }


    function emptyUI() {
        $("#newsType").val("");
        $("#newsTitle").val("");
        $("#newsSource").val("");
        $("#newsImage").val("");
    }



    function insertNews(newsObj) {
        $.ajax({
            url: config.serviceUrl + 'insertNews',
            type: 'post',
            data: newsObj,
            dataType: 'json',
            success: function(response) {
                if (response.result === "success") {
                    loadNews();
                    emptyUI();
                    return true;
                } else {
                    return false;
                }
            }
        })
    }


    function updateNews(newsObj) {
        $.ajax({
            url: config.serviceUrl + 'updateNews',
            type: 'post',
            data: newsObj,
            dataType: 'json',
            success: function(response) {
                if (response.result === "success") {
                    loadNews();
                    emptyUI();
                    return true;
                } else {
                    return false;
                }
            }
        })
    }

    function deleteNews(id) {
        var deleteId = {
            "id": id
        }
        $.ajax({
            url: config.serviceUrl + 'deleteNews',
            type: 'post',
            data: deleteId,
            dataType: 'json',
            success: function(response) {
                if (response.result === "success") {
                    loadNews();
                    return true;
                } else {
                    return false;
                }
            }
        })
    }

    function bindNewsType(selectElementId) {
        $.ajax({
            type: "post",
            dataType: 'json',
            url: config.serviceUrl + "NewsType",
            success: function(data) {
                $("#" + selectElementId).empty();
                var optionDefault = $("<option value=''>未选择</option>");
                $("#" + selectElementId).append(optionDefault);
                //data binding
                data.forEach(function(element, index) {
                    var option = $("<option value='" + element["id"] + "'>" + element["news_type_name"] + "</option>");
                    $("#" + selectElementId).append(option);
                });
                //console.log(data);
            },
            error: function(err) {
                console.log(err.msg)
            }
        });
    }

    function searchNews(pagerParam, searchParam) {
        var searchConditions = {
            pageCount: pagerParam.pgCount,
            startIndex: pagerParam.stIndex,
            newsId: searchParam.newsId,
            newsType: searchParam.newsType,
            newsTitle: searchParam.newsTitle,
            newsSource: searchParam.newsSource,
            newsImage: searchParam.newsImage
        };

        $.ajax({
            type: "post",
            dataType: "json",
            data: searchConditions,
            url: config.serviceUrl + "News",
            success: function(data) {
                $("#newsTitleUpdate").val(data[0].news_title);
                $("#newsSourceUpdate").val(data[0].news_source);
                $("#newsImageUpdate").val(data[0].news_img_url);
                $("#newsId").val(data[0].id);
                $("#newsTypeUpdate").val(data[0].news_type_id);
             

            },
            error: function(err) {
                console.log(err.msg)
            }
        });
    }

    function loadNews(pagerParam, searchParam) {
        var queryParam = {
                pageCount: pagerParam?pagerParam.pageCount:10,
                startIndex: pagerParam?pagerParam.startIndex:0
            }
            //get news data
        $.ajax({
            type: "post",
            dataType: "json",
            data:queryParam,
            url: config.serviceUrl + "News",
            success: function(data) {
            	if(data.length > 0){
            		refreshUI(data);
            		$("#currentIndex").val(queryParam.startIndex);
            	}
                //console.log(data);
            },
            error: function(err) {
                console.log(err.msg)
            }
        });


    }

    function refreshUI(data) {
        //data binding
        var gridviewContent = $("#gridview tbody");
        $(gridviewContent).empty();

        //footer pager
        var prevPager = $("#prevPager");

        $(prevPager)[0].onclick = function() {
            var currentIndex = Number($("#currentIndex").val());
            var params = {
                pageCount: 10,
                startIndex: currentIndex > 0 ? currentIndex-10 : 0,
            }
            loadNews(params, null);
        }




        var afterPager = $("#afterPager");
       
        $(afterPager)[0].onclick = function() {
           	var currentIndex = Number($("#currentIndex").val());
            var params = {
                pageCount: 10,
                startIndex: currentIndex + 10,
            }

            loadNews(params, null);
        }



        data.forEach(function(element, index) {

            var row = $("<tr>");
            var tdId = $("<td>" + element["id"] + "</td>");

            /* NEWS TITLE */
            var tdSourceTag = $("<span>", {
                class: "label label-info",
                text: element["news_source"]
            });
            var tdTitle = $("<td>", {
                text: element["news_title"]
            });
            //tag
            $(tdTitle).prepend(tdSourceTag);

            /* Opeartors */
            var tdOperator = $("<td>", {
                class: "operators"
            });

            /* update */
            var tdOperatorUpdate = $("<a>", {
                text: "编辑"
            });

            $(tdOperatorUpdate).attr("data-toggle", "modal");
            $(tdOperatorUpdate).attr("data-target", "#updateDialog");
            $(tdOperatorUpdate).on("click", function() {
                var pgParam = {};
                var searchParam = {
                    newsId: element["id"]
                };
                searchNews(pgParam, searchParam);



            })

            /*update end */

            /* delete */
            var tdOperatorDelete = $("<a>", {
                text: "删除"
            });

            $(tdOperatorDelete).attr("data-toggle", "modal");
            $(tdOperatorDelete).attr("data-target", "#deleteDialog");
            $(tdOperatorDelete).on("click", function() {
                    $("#deleteDialog").find(".modal-body").text("是否确认删除新闻:" +
                        element["news_title"] + "吗?");
                    $("#deleteNewsBtn").on("click", function() {
                        var toDelete = element["id"];
                        deleteNews(toDelete);
                    })
                })
                /* delete end */



            $(tdOperator).append(tdOperatorUpdate);
            $(tdOperator).append(tdOperatorDelete);

            /* NEWS TYPE */
            var tdNewsType = $("<td>");
            var tdNewsTypeSpan = $("<span>", {
                text: element["news_type_name"],
                class: "label label-default"
            })
            $(tdNewsType).prepend(tdNewsTypeSpan);

            /* NEWS IMAGE */
            var tdImage = $("<td><img src='" + element["news_img_url"] + "' /></td>");

            /* NEWS CREATED ON */
            var tdCreatedOn = $("<td>" + element["created_on"] + "</td>");

            /* NEWS UPDATED ON */
            var tdUpdatedOn = $("<td>" + element["updated_on"] + "</td>");

            $(row).append(tdId);
            $(row).append(tdNewsType);
            $(row).append(tdTitle);

            $(row).append(tdImage);
            $(row).append(tdCreatedOn);
            $(row).append(tdUpdatedOn);
            $(row).append(tdOperator);
            $(gridviewContent).append(row);



        });
    }



    bindEvents();
    loadNews();




})
