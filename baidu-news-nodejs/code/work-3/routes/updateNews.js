var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var moment = require('moment');
var config = require('../config/db');

/* 新闻首页 */
router.post('/', function(req, res, next) {


	var newsType = req.body.newsType;
 	var newsId = req.body.newsId;
	var newsTitle = req.body.newsTitle;
	var newsSource = req.body.newsSource;
	var newsImage = req.body.newsImage;
	var updatedOn = moment().format('YYYY-MM-DD, h:mm:ss a');
	res.set("date", updatedOn);

 	var conn = mysql.createConnection(config.connObj);

 	conn.connect();
 	var sql = "UPDATE `news` SET `news_title` = '" + newsTitle + 
 	    "',`news_type_id` = " + newsType +
		", `news_img_url` = '" + newsImage +
		"',`news_source` = '" + newsSource +
		"', `updated_on` = '" + updatedOn +
		"' WHERE id = "+ newsId;
 	
 	conn.query(sql, [], function(err, rows, fields){
 		if(err){
 			res.send(err);
 		}
 		res.json({result: "success"});
 	});
});

module.exports = router;