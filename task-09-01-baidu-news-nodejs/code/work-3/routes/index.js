var express = require('express');
var router = express.Router();
var config = require('../config/db');

/* 新闻首页 */
router.get('/', function(req, res, next) {
	var mobilelink = config.links.mobileLink;
	var adminlink = config.links.adminLink;
	res.render('index', { 
		title: 'Baidu News',
		mobileLink:mobilelink,
		adminLink:adminlink,
	});
});


module.exports = router;
