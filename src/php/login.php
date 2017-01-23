<?php 
	include("DBHelper.php");
	$usernameInfo = $_POST["username"];
	$pswInfo = $_POST["psw"];
	$sql = "SELECT * FROM accout where userName = '$usernameInfo' and password = '$pswInfo'";
    $res = query($sql);
    if($res){
    	echo '{"msg":"success"}';      
    }
    else{
    	echo '{"msg":"fail"}';
    }
?>