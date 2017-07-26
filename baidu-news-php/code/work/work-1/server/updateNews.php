<?php 
require_once('config.php');
if($link){

	$newsId = @$_POST["newsId"];
	$newsType = @$_POST["newsType"];
	$newsTitle = @$_POST["newsTitle"];
	$newsSource = @$_POST["newsSource"];
	$newsImage = @$_POST["newsImage"];
	$updatedOn =  date("Y-m-d H:i:s");

	$sql = "SELECT *
	 FROM news WHERE newsId = " +  $newsId;

    mysqli_query($link, "SET NAMES utf8");
	$result = mysqli_query($link, $sql);

	$sendBack = array("result" => "success");

	$sqlUpdate = "UPDATE `news` SET `news_title` = '" . $newsTitle . "',
		`news_type_id` = " . $newsType .
		", `news_img_url` = '" . $newsImage .
		"',`news_source` = '" . $newsSource .
		"', `updated_on` = '" . $updatedOn .
		"' WHERE id = ". $newsId;
		$resultUpdate = mysqli_query($link, $sqlUpdate);

		echo json_encode($sendBack);
}
mysqli_close($link);
?>
