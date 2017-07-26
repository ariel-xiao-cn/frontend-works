/* 兼容 IE 8 */
//compatibility-ie-8
define(function() {
    /* utilities */
    //Array.ForEach
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
    //Array.min
    Array.prototype.min = function() {
            return Math.min.apply({}, this);
        }
        //Array.max
    Array.prototype.max = function() {
        return Math.max.apply({}, this);
    }

    Array.prototype.indexOf = function(obj, start) {
        for (var i = (start || 0), j = this.length; i < j; i++) {
            if (this[i] === obj) {
                return i; }
        }
        return -1;
    };

    Array.prototype.indexOf = function(el, index) {
        var n = this.length >>> 0,
            i = ~~index;
        if (i < 0) i += n;
        for (; i < n; i++)
            if (i in this && this[i] === el) return i;
        return -1;
    };

    Array.prototype.indexOf = function(find, i /*opt*/ ) {
        if (i === undefined) i = 0;
        if (i < 0) i += this.length;
        if (i < 0) i = 0;
        for (var n = this.length; i < n; i++)
            if (i in this && this[i] === find)
                return i;
        return -1;
    };

    return Array;

});
