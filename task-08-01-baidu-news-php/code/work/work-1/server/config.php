<?php 
	
	ini_set('display_errors',1);
    error_reporting(E_ALL);
    
	header("Content-Type: application/json; charset=utf-8");
	$link = mysqli_connect('localhost', 'root', 'root', 'baidu_news', 3306);	
 ?>