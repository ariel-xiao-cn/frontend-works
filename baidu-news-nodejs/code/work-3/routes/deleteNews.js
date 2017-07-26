var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var config = require('../config/db');

/* 新闻首页 */
router.post('/', function(req, res, next) {

	var newsId = req.body.id;

 	var conn = mysql.createConnection(config.connObj);

 	conn.connect();
 	var sql = "DELETE from `news` where `id` = " + newsId;
 	
 	conn.query(sql, [], function(err, rows, fields){
 		if(err){
 			res.send(err);
 		}
 		res.json({result: "success"});
 	});
});

module.exports = router;
