<?php 
require_once('config.php');
if($link){

	$newsId = @$_POST["newsId"];
	$newsType = @$_POST["newsType"];
	$newsTitle = @$_POST["newsTitle"];
	$newsSource = @$_POST["newsSource"];
	$newsImage = @$_POST["newsImage"];
	$pageCount = @$_POST["pageCount"];
	$startIndex = @$_POST["startIndex"];

	$sql = "SELECT news.created_on, news.updated_on, news.id,
	news.news_type_id, news.news_title, 
	news.news_img_url, news.news_source, 
	news_type.news_type_name
	 FROM news join news_type on news.news_type_id = news_type.id";


	$limitCondition = " limit";
	if($startIndex){
		$limitCondition .= " ".$startIndex.",";
	} else{ 
		$limitCondition .= " 0,"; // default start from 0
	}
	if($pageCount){
		$limitCondition .= "". $pageCount." ";
	} else{ 
		$limitCondition .= "10 "; //default page count = 10
	}

	$whereCondition = " where 1 = 1 ";
	if($newsId){
		$whereCondition .= " and news.id = " .$newsId;
	}
	if($newsType && $newsType != 0){
		$whereCondition .= " and news.news_type_id =" .$newsType . "";
	}
	if($newsTitle){
		$whereCondition .= " and news.news_title like '%" .$newsTitle . "%'";
	}
	if($newsSource){
		$whereCondition .= " and news.news_source like '%" .$newsSource. "%'";
	}
	if($newsImage){
		$whereCondition .= " and news.news_img_url like '%" .$newsImage. "%'";
	}


	$orderBy = " order by news.id desc";



	$sql = $sql . $whereCondition . $orderBy . $limitCondition;

	mysqli_query($link, "SET NAMES utf8");

	$result = mysqli_query($link, $sql);
	$senddata = array();

	while ($row = mysqli_fetch_assoc($result)) {
		array_push($senddata, array(
			'id'=> $row['id'],
			'news_type_id' => $row['news_type_id'],
			'news_title'=> $row['news_title'],
			'news_type_name'=> $row['news_type_name'],
			'news_img_url' => $row['news_img_url'],
			'created_on'=> $row['created_on'],
			'news_source' => $row['news_source'],
			'updated_on'=> $row['updated_on']
			));
		
	}

	echo json_encode($senddata);
}
mysqli_close($link);
 ?>
