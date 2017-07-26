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
BindAll();

//定义:检查local storage兼容性
//返回值false : 不支持或其他原因不允许使用local storage
//返回值true  : 可以使用local storage
function supportChecking() {
    var msg = "";
    try {
        if (!window.localStorage) {
            msg = ERROR_HEADING + MSG_CONNECTOR + ERROR_01;
            alert(msg);
            console.log(msg);
            return false;

        } else {
            msg = INFO_HEADING + MSG_CONNECTOR + INFO_01;
            console.log(msg);
            return true;
        }
    } catch (ex) {
        msg = ERROR_HEADING + MSG_CONNECTOR + ex.message;
        alert(msg);
        console.log(msg);
        return false;
    }

}


//定义:加载本地配置
//返回值 1: 已解析本地配置文件
//返回值 2：本地允许配置 但暂无配置
//返回值 3：本地浏览器原因，导致不允许/不支持配置
function loadConfig() {
    if (supportChecking) {
        var configString = localStorage.getItem("SITE_CONFIG");
        //如果有预设配置, 解析配置
        if (configString) {
            configs = configString.split(';');
            console.log(INFO_HEADING + MSG_CONNECTOR + INFO_04 + configString);
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

function setThemeToHtml(value){
	document.body.setAttribute("data-theme",value);
}

//定义:初始化本地配置
function initializeConfig(name, value) {
	var valueToSet = "";
	valueToSet = name + ":" + value;
	localStorage.setItem("SITE_CONFIG", valueToSet);
	setThemeToHtml(value);
	console.log(INFO_HEADING + MSG_CONNECTOR + INFO_03 + value);
}

//定义:更新本地配置
function updateConfig(name, value) {
	var valueToSet = "";
	valueToSet = name + ":" + value;
	localStorage.setItem("SITE_CONFIG", valueToSet);
	setThemeToHtml(value);
	//log
	console.log(INFO_HEADING + MSG_CONNECTOR + INFO_02 + value);
}


function switchTheme(switchElement) {
    var localSetting = loadConfig();
    var themeVal = switchElement.getAttribute("data-opt");

    switch (localSetting) {
        case 1:
            // 已有配置 -> 使用updateConfig 更新配置         
            updateConfig('theme', themeVal);
            break;
        case 2:
            // 没有配置 -> 使用 initializeConfig　初始化配置
            initializeConfig('theme', themeVal);
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




//绑定事件
function BindAll() {
    var switchs = getELementsByAttribute(document, "data-type", "theme-switch");
    switchs.forEach(function(switch_e, index) {
            addEventHandler("click", switch_e, function(){
            	switchTheme(switch_e);
            });
    });

    addEventHandler("load", window, function(){
    	loadConfig();
    	renderByConfig();
    })
}


function renderByConfig(){
	if(configs.length > 0)
	{
		var theme = configs[0].split(':')[1];
		setThemeToHtml(theme);
	}
}




/* ******************* utilities ************************ */
function getELementsByAttribute(node, attrName, attrVal) {
    var resultArr = [];
    var eles = document.getElementsByTagName("*");
    for (var iEle = 0; iEle < eles.length; iEle++) {
        var attr = eles[iEle].getAttribute(attrName);
        if (attr && attr == attrVal) {
            resultArr.push(eles[iEle]);
        }

    }
    return resultArr;
}


function addEventHandler(eventName, element, functionObj) {
    if (element) {
        // ie 9, chrome , firefox..
        if (document.addEventListener) {
            element.addEventListener(eventName, functionObj);
        }
        // ie 8 -
        else {
            element.attachEvent("on" + eventName, functionObj);
        }
    } else {
        console.log(ERROR_HEADING + MSG_CONNECTOR + ERROR_02)
    }
}

/* 转换: 字符串 到 有key-value键值对的数组 */
function stringToKV(stringIn, pairSeperator, kVseperator) {
    try {
        var arr = stringIn.split(pairSeperator);
        var resultArr = [];
        if(arr){
        	arr.forEach( function(element, index) {
        		var tempArr = element.split(kVseperator);
        		var tempObj = {};
        		tempObj.key = tempArr[0];
        		tempObj.value = tempArr[1].replace(kVseperator,"");
        		resultArr.push(tempObj);
        	});
        	return resultArr;
        }
    } catch (e) {
        // statements
        console.log(e);
    }
}




/* 兼容 IE 8 */
//foreach
if (!Array.prototype.forEach && typeof Array.prototype.forEach !== "function") {
    Array.prototype.forEach = function(callback, context) {

        if (Object.prototype.toString.call(this) === "[object Array]") {
            var i,
                len;
            for (i = 0, len = this.length; i < len; i++) {
                if (typeof callback === "function" && Object.prototype.hasOwnProperty.call(this, i)) {
                    if (callback.call(context, this[i], i, this) === false) {
                        break;
                    }
                }
            }
        }
    };
}