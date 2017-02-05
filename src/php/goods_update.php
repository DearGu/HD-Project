<?php 
    include("DBHelper.php");
    $usernameInfo = $_POST["username"];
    $shoplist = $_POST["cartlist"];
    $sql = "update cart set shoplist='$shoplist' where username='$usernameInfo'";
    $res = excute($sql);
    if($res){
        echo '{"msg":"success"}';
    }
?>