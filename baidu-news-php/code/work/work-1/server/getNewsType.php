<?php 
require_once('config.php');
if($link){
	$sql = "SELECT * FROM news_type";
	mysqli_query($link, "SET NAMES utf8");
	$result = mysqli_query($link, $sql);
	$senddata = array();
	while ($row = mysqli_fetch_assoc($result)) {
		array_push($senddata, array(
			'id'=> $row['id'],
			'news_type_name' => $row['news_type_name'],
			'created_on'=> $row['created_on'],
			'updated_on'=> $row['updated_on']
			));
		
	}
	echo json_encode($senddata);
}
mysqli_close($link);
?>
