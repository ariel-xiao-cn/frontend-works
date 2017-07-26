var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var config = require('../config/db');

/* 新闻首页 */
router.post('/', function(req, res, next) {



 	var conn = mysql.createConnection(config.connObj);

 	conn.connect();
 	var sql = "SELECT * FROM news_type";
 	
 	conn.query(sql, [], function(err, rows, fields){
 		if(err){
 			res.send(err);
 		}
 		res.json(rows);
 	});
});

module.exports = router;
