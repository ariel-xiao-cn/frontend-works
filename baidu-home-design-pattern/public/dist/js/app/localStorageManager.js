"use strict";define(function(){var t,o=function(){this.initialize()};return o.prototype.config=function(o,e){return!!t&&(e?(localStorage[o]=e,!0):localStorage[o])},o.prototype.isStorageSupported=function(){try{t=!!window.localStorage}catch(o){t=!1}finally{return this.isStorageSupported=function(){return t},t}},o.prototype.initialize=function(){this.isStorageSupported()||alert("local storage is not supported.")},o.prototype.remove=function(o){return!(!t||!localStorage[o])&&(localStorage.removeItem(o),!0)},o});