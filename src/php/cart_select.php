<?php 
	include("DBHelper.php");
	$usernameInfo = $_POST["username"];
	$sql = "SELECT * FROM cart where userName = '$usernameInfo'";
    $res = query($sql);
    $J_res = json_encode($res, JSON_UNESCAPED_UNICODE);
    for($i=0;$i<count($res);$i++){
        if($res[$i]->shoplist != ''){
                echo '{"msg":"success","data":'.$J_res.'}';
        }
        else{
            echo '{"msg":"fail"}';
        }
    }
    // if($res){
    // 	echo '{"msg":"success","data":'.$J_res.'}';      
    // }
?>