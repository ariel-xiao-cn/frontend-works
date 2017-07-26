
<?php 
require_once('config.php');
if($link){

	$now = date("Y-m-d H:i:s");
	$newsType = @$_POST["newsType"];
	$newsTitle = @$_POST["newsTitle"];
	$newsSource = @$_POST["newsSource"];
	$newsImage = @$_POST["newsImage"];
	$updatedOn = @$now;
	$createdOn = @$now;	

	$sql = "INSERT INTO `news`(`news_type_id`, `news_title`, `news_img_url`, `news_source`,`created_on`,`updated_on`) VALUES ($newsType,'$newsTitle','$newsImage','$newsSource', '$createdOn', '$updatedOn')";

	mysqli_query($link, "SET NAMES utf8");
	$result = mysqli_query($link, $sql);
	if($result)
	{
		echo json_encode(array("result" => "success"));
	}
	
}
mysqli_close($link);
?>
