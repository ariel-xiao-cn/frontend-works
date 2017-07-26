// 0:input, 1:operator, -1:init-v
var resultStatus = -1;
var digs = getELementsByAttribute(document, "data-type","dig");
var allBtns = document.getElementById("main-frame").getElementsByTagName("li");
var digArr = [].slice.call(digs);
var allBtnsArr = convertToArray(allBtns);
var globalInputCurrentValue = document.getElementById("cur-val");
var lblFlag = document.getElementById("flag");
var lblOperator = document.getElementById("op");
var eventBtn = document.getElementById("calculator");
var bufferedCurrentValue = 0;
var bufferedOperator;
var resultControl = document.getElementById("result");
var currentCount = 1;



function convertToArray(nodeList) {
    var tempArr = [];
    for (var iBtn = 0; iBtn < allBtns.length; iBtn++) {
        tempArr.push(allBtns[iBtn]);
    }
    return tempArr;
}




function getELementsByAttribute(node, attrName, attrVal){
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


//兼容iE8
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
        console.log("error: element doesn't exist.")
    }
}


/* -------------Binding------------ */

function BindAll() {
    allBtnsArr.forEach(function(element_btn, index_dg) {
        addEventHandler("click", element_btn, function() {
            /* animation */
            var cls = element_btn.getAttribute("class");
            element_btn.setAttribute("class", cls + " keyDown");
            setTimeout(function() {
                element_btn.setAttribute("class", cls);
            }, 100);
            /* */

        });
    });

    digArr.forEach(function(element_dg, index_dg) {
        addEventHandler("click", element_dg, function() {
            if (element_dg.id !== dotCtl.id) {
                var tempHTML;
                switch (resultStatus) {
                    case -1:
                        globalInputCurrentValue.innerText = element_dg.innerText;
                        resultStatus = 0;
                        break;
                    case 0:
                    	if(globalInputCurrentValue.innerText!="0")
                    	{
                    		  globalInputCurrentValue.innerText = globalInputCurrentValue.innerText + element_dg.innerText;
                    	}
                    	else
                    	{
                    		 globalInputCurrentValue.innerText = element_dg.innerText;
                    	}
                      
                        break;
                    case 1:

                        bufferedCurrentValue = globalInputCurrentValue.innerText;

                        bufferedOperator = lblOperator.innerText;
                        lblOperator.innerText = "";
                        globalInputCurrentValue.innerText = element_dg.innerText;
                        resultStatus = 0;

                        break;
                    default:

                        break;
                }
            }
        });

    });

    //Bind dot BTN
    var dotCtl = document.getElementById("dot");

    addEventHandler("click", dotCtl, function() {

        var tempHTML;
        switch (resultStatus) {
            case -1:
                globalInputCurrentValue.innerText = dotCtl.innerText;
                resultStatus = 0;
                break;
            case 0:
                globalInputCurrentValue.innerText = globalInputCurrentValue.innerText + dotCtl.innerText;
                break;
            case 1:

                bufferedCurrentValue = globalInputCurrentValue.innerText;

                bufferedOperator = lblOperator.innerText;
                lblOperator.innerText = "";
                globalInputCurrentValue.innerText = dotCtl.innerText;
                resultStatus = 0;

                break;
            default:

                break;
        }
        checkDot();
    });

    //Bind X 
    var clearOneStepCtl = document.getElementById("clearOneStep");
    addEventHandler("click", clearOneStepCtl, function() {
        clearOneStep();
    });

    //Bind CE 
    var clearAllCtl = document.getElementById("clearAll");
    addEventHandler("click", clearAllCtl, function() {
        allClear();
    });

    //Bind CE 
    var clearEntryCtl = document.getElementById("clearEntry");
    addEventHandler("click", clearEntryCtl, function() {
        clearEntry();
    });

    //Bind Neg/Pos
    var btnFlag = document.getElementById("switchNP");
    addEventHandler("click", btnFlag, function() {
        switchPosNeg();
    });

    var btnDivide = document.getElementById("divide");
    addEventHandler("click", btnDivide, function() {
        divide();
        resultStatus = 1;
    });

    var btnPlus = document.getElementById("plus");
    addEventHandler("click", btnPlus, function() {
        plus();
        resultStatus = 1;
    });

    var btnMinors = document.getElementById("minors");
    addEventHandler("click", btnMinors, function() {
        minors();
        resultStatus = 1;
    });

    var btnTimes = document.getElementById("times");
    addEventHandler("click", btnTimes, function() {
        times();
        resultStatus = 1;
    });

    var btnEqual = document.getElementById("equals");
    addEventHandler("click", btnEqual, function() {
        equals();
        resultStatus = 1;
    });


    var btnSin = document.getElementById("sin");
    addEventHandler("click", btnSin, function() {
        sin();
        resultStatus = 1;
    });

    var btnCos = document.getElementById("cos");
    addEventHandler("click", btnCos, function() {
        cos();
        resultStatus = 1;
    });

    var btnMod = document.getElementById("mod");
    addEventHandler("click", btnMod, function() {
        mod();
        resultStatus = 1;
    });




}





/* ------- utilities ------------*/

//check dot
function checkDot() {
    var posFirstDot = globalInputCurrentValue.innerText.indexOf(".");
    var stringLength = globalInputCurrentValue.innerText.length;
    if (posFirstDot > -1) {
        var firstHalfString = globalInputCurrentValue.innerText.slice(0, posFirstDot);
        var secondHalfString = globalInputCurrentValue.innerText.slice(posFirstDot, stringLength - 1);
        if (secondHalfString.indexOf(".") > -1) {
            globalInputCurrentValue.innerText = firstHalfString + "." + secondHalfString.replace(".", "");
        }
    }
    if (globalInputCurrentValue.innerText == ".") {
        globalInputCurrentValue.innerText = "0.";
    }
}


//switch Pos/Neg +/-
function switchPosNeg() {
    globalInputCurrentValue.innerText = 0 - Number(globalInputCurrentValue.innerText);
}

//sin
function sin() {
    finalResult = Math.sin(((Number(globalInputCurrentValue.innerText) * 2 * Math.PI / 360).toFixed(8)));
    commandStack = "sin(" + globalInputCurrentValue.innerText + "°) = " + finalResult;
    globalInputCurrentValue.innerText = finalResult;
    bufferedOperator = "";
    PrintResult(commandStack);
}

//cos
function cos() {
    finalResult = Math.cos(((Number(globalInputCurrentValue.innerText) * 2 * Math.PI / 360).toFixed(8)));
    commandStack = "cos(" + globalInputCurrentValue.innerText + "°) = " + finalResult;
    globalInputCurrentValue.innerText = finalResult;
    bufferedOperator = "";
    PrintResult(commandStack);
}

//mod
function mod() {
    lblOperator.innerHTML = "%";
}

//plus
function plus() {
    lblOperator.innerHTML = "+";
}

//times
function times() {
    lblOperator.innerHTML = "x";
}

//divide
function divide() {
    lblOperator.innerHTML = "÷";
}

//minors
function minors() {
    lblOperator.innerHTML = "-";
}

//equal
function equals() {
    //检查过长的操作单元
    if (globalInputCurrentValue.innerText.length > 10 || bufferedCurrentValue.length > 10) {
        alert("不支持操作单元长度多于10位以上的运算, 请使用AC并重新输入.");
        return;
    }
    var finalResult = "";
    var commandStack = "";
    if (globalInputCurrentValue.innerText[globalInputCurrentValue.innerText.length - 1] == ".") {
        globalInputCurrentValue.innerText = globalInputCurrentValue.innerText.replace(".", "");
    }
    switch (bufferedOperator) {
        case "+":
            finalResult = parseFloat((Number(bufferedCurrentValue) + Number(globalInputCurrentValue.innerText)).toFixed(8));
            commandStack = bufferedCurrentValue + " + " + globalInputCurrentValue.innerText + " = " + finalResult;


            break;
        case "x":
            finalResult = parseFloat((Number(bufferedCurrentValue) * Number(globalInputCurrentValue.innerText)).toFixed(8));
            commandStack = bufferedCurrentValue + " X " + globalInputCurrentValue.innerText + " = " + finalResult;


            break;
        case "÷":
            if (Number(globalInputCurrentValue.innerText) == 0) {
                commandStack = bufferedCurrentValue + " ÷ " + globalInputCurrentValue.innerText + " = " + "NaN";
                alert("0不能作为除数.");
                break;
            }
            finalResult = parseFloat((Number(bufferedCurrentValue) / Number(globalInputCurrentValue.innerText)).toFixed(8));
            commandStack = bufferedCurrentValue + " ÷ " + globalInputCurrentValue.innerText + " = " + finalResult;


            break;
        case "-":
            finalResult = parseFloat((Number(bufferedCurrentValue) - Number(globalInputCurrentValue.innerText)).toFixed(8));
            commandStack = bufferedCurrentValue + " - " + globalInputCurrentValue.innerText + " = " + finalResult;

            break;

        case "%":
            finalResult = parseFloat((Number(bufferedCurrentValue) % Number(globalInputCurrentValue.innerText)).toFixed(8));
            commandStack = bufferedCurrentValue + " mod(%) " + globalInputCurrentValue.innerText + " = " + finalResult;

            break;

        case "":
            finalResult = globalInputCurrentValue.innerText;
            commandStack = "提示：无运算符， 结果维持不变: " + finalResult;
            break;
        default:
            // statements_def
            break;
    }

    globalInputCurrentValue.innerText = finalResult;
    bufferedOperator = "";
    if (globalInputCurrentValue.innerText.length > 10) {
        globalInputCurrentValue.innerText = "0";
        PrintResult("不支持操作单元长度多于10位以上的运算, 请使用AC并重新输入.")
        return;
    }
    PrintResult(commandStack);
}

//AC
function allClear() {
    globalInputCurrentValue.innerText = 0;
    bufferedOperator = "";
    bufferedCurrentValue = 0;
    resultStatus = -1;
}

//CE 
function clearEntry() {
    globalInputCurrentValue.innerText = 0;
    resultStatus = -1;
}

//X
function clearOneStep() {
    //if contains "."
    var textLength = globalInputCurrentValue.innerText.length;
    if (textLength == 1) {
        globalInputCurrentValue.innerText = 0;
        resultStatus = -1;
        return;
    }
    if (globalInputCurrentValue.innerText[textLength - 2] == ".") {
        globalInputCurrentValue.innerText = globalInputCurrentValue.innerText.substring(0, textLength - 2);
    } else {
        globalInputCurrentValue.innerText = globalInputCurrentValue.innerText.substring(0, textLength - 1);
    }
}

function PrintResult(resultString) {
    if (currentCount > 10) {
        resultControl.innerText = "";
        currentCount = 1;
    }
    var prefixString = "计算结果 : ";
    var listitemNode = document.createElement("li");
    var textNode = document.createTextNode(currentCount + " - " + prefixString + resultString);
    listitemNode.appendChild(textNode);
    resultControl.appendChild(listitemNode);
    currentCount++;
}




addEventHandler("load", window, BindAll);
allClear();
