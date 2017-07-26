var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var config = require('../config/db');

/* 新闻首页 */
router.post('/', function(req, res, next) {

	
 	var newsType = req.body.newsType;
 	var newsId = req.body.newsId;
	var newsTitle = req.body.newsTitle;
	var newsSource = req.body.newsSource;
	var newsImage = req.body.newsImage;
	var pageCount = req.body.pageCount;
	var startIndex = req.body.startIndex;

 	var limitCondition = " limit";
 	var orderBy = " order by news.id desc";
 	var whereCondition = " where 1 = 1 ";

	if(startIndex){
		limitCondition += " "+startIndex+",";
	} else{ 
		limitCondition += " 0,"; // default start from 0
	}
	if(pageCount){
		limitCondition += ""+ pageCount +" ";
	} else{ 
		limitCondition += "10 "; //default page count = 10
	}

	if(newsId){
		whereCondition += " and news.id = " +newsId;
	}
	if(newsType && newsType != 0){
		whereCondition += " and news.news_type_id =" + newsType + "";
	}
	if(newsTitle){
		whereCondition += " and news.news_title like '%" + newsTitle + "%'";
	}
	if(newsSource){
		whereCondition += " and news.news_source like '%" + newsSource+ "%'";
	}
	if(newsImage){
		whereCondition += " and news.news_img_url like '%" + newsImage+ "%'";
	}

	


 	var conn = mysql.createConnection(config.connObj);

 	conn.connect();

 	var sql = "SELECT news.created_on, news.updated_on, news.id, news.news_type_id, news.news_title, news.news_img_url, news.news_source, news_type.news_type_name FROM news join news_type on news.news_type_id = news_type.id";
 	sql = sql  + whereCondition + orderBy + limitCondition;

 	conn.query(sql, [], function(err, rows, fields){
 		if(err){
 			res.send(err);
 		}
 		res.json(rows);
 	});
});

module.exports = router;
