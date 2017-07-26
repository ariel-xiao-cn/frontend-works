/* ------------- 单例模式 ------------ */
// configManager
// 提供 检测可用性, 读写config 方法
// 对localstorage 对象的基本操作, 加入检查localstorage可用性的方法
define(function() {
    
	var localStorageManager = function(){
		 this.initialize();
	}; 

    var _isSupportLocalStorage;
    localStorageManager.prototype.config = function(key, value) {
        if (_isSupportLocalStorage) {
            //set
            if (value) {
                localStorage[key] = value;
                return true;
            }
            //get
            return localStorage[key];
        }
        return false;

    }

    //lazy load
    localStorageManager.prototype.isStorageSupported = function() {
        try {
            if (!window.localStorage) {
                _isSupportLocalStorage = false;

            } else {
                _isSupportLocalStorage = true;
            }
        } catch (ex) {
            _isSupportLocalStorage = false;
        } finally {
            this.isStorageSupported = function() {
                return _isSupportLocalStorage;
            }
            return _isSupportLocalStorage;
        }
    };
    //initialize
    localStorageManager.prototype.initialize = function() {
        (this.isStorageSupported())?null:alert("local storage is not supported.");
    };

    localStorageManager.prototype.remove = function(key){
    	if (_isSupportLocalStorage) {
            if(localStorage[key])
            {
            	localStorage.removeItem(key);
            	return true;
            }
        }
        return false;
    }

    return localStorageManager;
})