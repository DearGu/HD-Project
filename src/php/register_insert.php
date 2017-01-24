<?php 
	include("DBHelper.php");
	$usernameInfo = $_POST["username"];
    $psw = $_POST["psw"];
	$sql = "insert into accout (userName,password) values ('$usernameInfo','$psw')";
    $res = excute($sql);
    if($res){
    	echo '{"msg":"success"}';      
    }
    else{
    	echo '{"msg":"fail"}';
    }
?>