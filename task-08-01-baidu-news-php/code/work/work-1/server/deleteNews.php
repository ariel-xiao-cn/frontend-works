
<?php 
require_once('config.php');
if($link){

	$id = @$_POST["id"];

	$sql = "DELETE from `news` where `id` = $id";

	mysqli_query($link, "SET NAMES utf8");
	$result = mysqli_query($link, $sql);
	if($result)
	{
		echo json_encode(array("result" => "success"));
	}

}
mysqli_close($link);
?>
