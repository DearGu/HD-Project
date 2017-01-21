<?php 
    include("DBHelper.php");
    $sql = "SELECT * FROM hdindex";
    $res = query($sql);
    $new_arrival1 = array();
    $new_arrival2 = array();
    $new_arrival3 = array();
    $new_arrival4 = array();
    $new_arrival5 = array();
    $HS_goods = array();
    $DK_goods = array();
    $NN_goods = array();
    $MH_goods = array();
    $NBS_goods = array();

    for($i=0;$i<count($res);$i++){
        if($res[$i]->type=="韩风女装" && $res[$i]->status=="new"){
            $obj = (object)array();
            $obj->goodsID=$res[$i]->goodsID;
            $obj->goodsTitle=$res[$i]->goodsTitle;
            $obj->goodsImg=$res[$i]->goodsImg;
            $obj->goodsPrice=$res[$i]->goodsPrice;
            $obj->goodsOldPrice=$res[$i]->goodsOldPrice;
           $new_arrival1[] = $obj; 
        }
        if($res[$i]->type=="甜美少女" && $res[$i]->status=="new"){
            $obj = (object)array();
            $obj->goodsID=$res[$i]->goodsID;
            $obj->goodsTitle=$res[$i]->goodsTitle;
            $obj->goodsImg=$res[$i]->goodsImg;
            $obj->goodsPrice=$res[$i]->goodsPrice;
            $obj->goodsOldPrice=$res[$i]->goodsOldPrice;
           $new_arrival2[] = $obj; 
        }
        if($res[$i]->type=="迪葵纳" && $res[$i]->status=="new"){
            $obj = (object)array();
            $obj->goodsID=$res[$i]->goodsID;
            $obj->goodsTitle=$res[$i]->goodsTitle;
            $obj->goodsImg=$res[$i]->goodsImg;
            $obj->goodsPrice=$res[$i]->goodsPrice;
            $obj->goodsOldPrice=$res[$i]->goodsOldPrice;
           $new_arrival3[] = $obj; 
        }
        if($res[$i]->type=="简约女装" && $res[$i]->status=="new"){
            $obj = (object)array();
            $obj->goodsID=$res[$i]->goodsID;
            $obj->goodsTitle=$res[$i]->goodsTitle;
            $obj->goodsImg=$res[$i]->goodsImg;
            $obj->goodsPrice=$res[$i]->goodsPrice;
            $obj->goodsOldPrice=$res[$i]->goodsOldPrice;
           $new_arrival4[] = $obj; 
        }
        if($res[$i]->type=="韩风童装" && $res[$i]->status=="new"){
            $obj = (object)array();
            $obj->goodsID=$res[$i]->goodsID;
            $obj->goodsTitle=$res[$i]->goodsTitle;
            $obj->goodsImg=$res[$i]->goodsImg;
            $obj->goodsPrice=$res[$i]->goodsPrice;
            $obj->goodsOldPrice=$res[$i]->goodsOldPrice;
           $new_arrival5[] = $obj; 
        }
        if($res[$i]->type=="韩都衣舍" && $res[$i]->status=="normal"){
            $obj = (object)array();
            $obj->goodsID=$res[$i]->goodsID;
            $obj->goodsTitle=$res[$i]->goodsTitle;
            $obj->goodsImg=$res[$i]->goodsImg;
            $obj->goodsPrice=$res[$i]->goodsPrice;
            $obj->goodsOldPrice=$res[$i]->goodsOldPrice;
            $HS_goods[] = $obj; 
        }
        if($res[$i]->type=="迪葵纳" && $res[$i]->status=="normal"){
            $obj = (object)array();
            $obj->goodsID=$res[$i]->goodsID;
            $obj->goodsTitle=$res[$i]->goodsTitle;
            $obj->goodsImg=$res[$i]->goodsImg;
            $obj->goodsPrice=$res[$i]->goodsPrice;
            $obj->goodsOldPrice=$res[$i]->goodsOldPrice;
            $DK_goods[] = $obj; 
        }
        if($res[$i]->type=="娜娜日记" && $res[$i]->status=="normal"){
            $obj = (object)array();
            $obj->goodsID=$res[$i]->goodsID;
            $obj->goodsTitle=$res[$i]->goodsTitle;
            $obj->goodsImg=$res[$i]->goodsImg;
            $obj->goodsPrice=$res[$i]->goodsPrice;
            $obj->goodsOldPrice=$res[$i]->goodsOldPrice;
            $NN_goods[] = $obj; 
        }
        if($res[$i]->type=="米妮哈鲁" && $res[$i]->status=="normal"){
            $obj = (object)array();
            $obj->goodsID=$res[$i]->goodsID;
            $obj->goodsTitle=$res[$i]->goodsTitle;
            $obj->goodsImg=$res[$i]->goodsImg;
            $obj->goodsPrice=$res[$i]->goodsPrice;
            $obj->goodsOldPrice=$res[$i]->goodsOldPrice;
            $MH_goods[] = $obj; 
        }
        if($res[$i]->type=="尼班诗" && $res[$i]->status=="normal"){
            $obj = (object)array();
            $obj->goodsID=$res[$i]->goodsID;
            $obj->goodsTitle=$res[$i]->goodsTitle;
            $obj->goodsImg=$res[$i]->goodsImg;
            $obj->goodsPrice=$res[$i]->goodsPrice;
            $obj->goodsOldPrice=$res[$i]->goodsOldPrice;
            $NBS_goods[] = $obj; 
        }
    }
    $J_new_arrival1 = json_encode($new_arrival1, JSON_UNESCAPED_UNICODE);
    $J_new_arrival2 = json_encode($new_arrival2, JSON_UNESCAPED_UNICODE);
    $J_new_arrival3 = json_encode($new_arrival3, JSON_UNESCAPED_UNICODE);
    $J_new_arrival4 = json_encode($new_arrival4, JSON_UNESCAPED_UNICODE);
    $J_new_arrival5 = json_encode($new_arrival5, JSON_UNESCAPED_UNICODE);
    $J_HS_goods = json_encode($HS_goods, JSON_UNESCAPED_UNICODE);
    $J_DK_goods = json_encode($DK_goods, JSON_UNESCAPED_UNICODE);
    $J_NN_goods = json_encode($NN_goods, JSON_UNESCAPED_UNICODE);
    $J_MH_goods = json_encode($MH_goods, JSON_UNESCAPED_UNICODE);
    $J_NBS_goods = json_encode($NBS_goods, JSON_UNESCAPED_UNICODE);
    echo '[{"msg":"新品韩风女装","data":'.$J_new_arrival1.'},{"msg":"新品甜美少女","data":'.$J_new_arrival2.'},{"msg":"新品迪葵纳","data":'.$J_new_arrival3.'},{"msg":"新品简约女装","data":'.$J_new_arrival4.'},{"msg":"新品韩风童装","data":'.$J_new_arrival5.'},{"msg":"韩都衣舍","data":'.$J_HS_goods.'},{"msg":"迪葵纳","data":'.$J_DK_goods.'},{"msg":"娜娜日记","data":'.$J_NN_goods.'},{"msg":"米妮哈鲁","data":'.$J_MH_goods.'},{"msg":"尼班诗","data":'.$J_NBS_goods.'}]';
?>