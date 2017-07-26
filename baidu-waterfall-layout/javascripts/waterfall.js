/* const */
var config = {
        galleryWidth: 1200, //gallery width
        galleryItemWidth: 250, //img item width
        galleryItemMargin: 10 //img item margin
    }
    /* var */
var galleryColumnCount = 0;
var galleryArray = [];
var galleryJSON = [{ "src": "../images/waterfall_500_01.png" },
        { "src": "../images/waterfall_500_02.png" }, { "src": "../images/waterfall_500_03.png" },
        { "src": "../images/waterfall_500_04.png" }, { "src": "../images/waterfall_500_05.png" },
        { "src": "../images/waterfall_500_06.png" }, { "src": "../images/waterfall_500_07.png" },
        { "src": "../images/waterfall_500_08.png" }, { "src": "../images/waterfall_500_09.png" },
        { "src": "../images/waterfall_500_10.png" }
    ]
    /* elements */
var galleryImageList;
var galleryContainer;

$().ready(function() {

    galleryContainer = $("ul.imageList");
    galleryImageList = $("ul.imageList > li");
    $(window).on("load", function() {

        repositionElements();

    })
    window.onscroll = function() {
    	//是否浏览到了底端
        if (IsScrolltoBottom()) {
        	//读取一次JSON 并为每组数据创建 li > img 并加入到 ul
            $.each(galleryJSON, function(index, value) {
                var liCon = $("<li style='display:none'>");
                var img = $("<img>");
                img.attr("src", value.src);
                img.appendTo(liCon);
                liCon.appendTo(galleryContainer);
                liCon.fadeIn(1000);
            });
            //重新排版
            repositionElements();
        }
    };
});


//根据空缺程度, 为下一个元素分配定位: left和top的属性值
function repositionElements() {
    //计算图片数组长度
    galleryArray = [];
    galleryColumnCount = getRowItemCount(config);
    //初始化 列数组
    for (var i = 0; i < galleryColumnCount; i++) {
        galleryArray.push(galleryImageList.eq(i).height());
    }
    galleryImageList = $("ul.imageList > li");
    $.each(galleryImageList, function(index, item) {
        if (index >= galleryColumnCount) {
            var noNextCol = getLowestColumn(galleryArray);
            var cor = getLocation(noNextCol, config);
            $(item).css({
                "left": cor.left,
                "top": cor.top,
                "position": "absolute"
            });
            galleryArray[noNextCol.index] += $(item).height() + 20;
        }
    });
}

//判断是否浏览到了底端
function IsScrolltoBottom() {
    var lastItem = $("ul.imageList > li");
    var lastItemHeight = lastItem.last().get(0).offsetTop + lastItem.height() / 3;
    var documentHeight = $(window).height();
    var curScrollHeight = $(window).scrollTop();
    return (lastItemHeight < documentHeight + curScrollHeight) ?
        true : false;
}

//border-box的盒子模型
//计算每行允许的图片数量
function getRowItemCount(config) {
    try {
        var count = parseInt(config.galleryWidth / (config.galleryItemMargin * 2 + config.galleryItemWidth));
        return count;
    } catch (e) {
        alert(e.message);
    }
}

//计算数组中最小项
function getLowestColumn(columnArray) {
    var tempShortest = {
        index: 0,
        height: 0
    };
    if (columnArray) {
        tempShortest.height = columnArray.min();
        tempShortest.index = $.inArray(tempShortest.height, columnArray);
        return tempShortest;
    }
}


//分配定位 从1开始
function getLocation(noNextCol, config) {
    //1. 根据数组中的定位 和 config 计算将要定位的坐标
    var cor = {
        left: 0,
        top: 0
    }
    cor.left = (noNextCol.index) * (config.galleryItemWidth + 20) + "px";
    cor.top = noNextCol.height + 20 + "px";
    return cor;

}

/* utilities */
Array.prototype.min = function() {
    return Math.min.apply({}, this);
}
