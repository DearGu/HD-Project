<?php 
	include("DBHelper.php");
	$usernameInfo = $_POST["username"];
    $psw = $_POST["psw"];
	$sql = "insert into accout (userName,password) values ('$usernameInfo','$psw')";
    $sql1 = "insert into cart (userName) values ('$usernameInfo')";
    $res = excute($sql);
    $res1 = excute($sql1);
    if($res){
    	echo '{"msg":"success"}';      
    }
    else{
    	echo '{"msg":"fail"}';
    }
?>