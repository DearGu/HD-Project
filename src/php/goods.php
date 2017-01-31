<?php 
    include("DBHelper.php");
    $goodsID = $_GET["goodsID"];
    $sql = "SELECT * FROM goods where goodsID = '$goodsID'";
    $res = query($sql);
    $J_res = json_encode($res, JSON_UNESCAPED_UNICODE);
    if($res){
        echo '{"msg":"success","data":'.$J_res.'}';
    }
?>