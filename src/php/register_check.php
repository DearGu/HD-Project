<?php 
	include("DBHelper.php");
	$usernameInfo = $_POST["username"];
	$sql = "SELECT * FROM accout where userName = '$usernameInfo'";
    $res = query($sql);
    if($res){
    	echo '{"msg":"fail"}';      
    }
    else{
    	echo '{"msg":"pass"}';
    }
?>