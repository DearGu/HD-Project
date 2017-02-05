$(function(){
	var webNavigation = $(".web_navigation");
	var webList = $(".weblist");
	var pullListContent = $(".pullList_content");
	var $webLinkShow = $(".web_link_show");
	var $webLink = $webLinkShow.find("ul");
	var floatBox = $(".float_box");
	var $headerFr = $(".header_fr");
	var $headerUl = $headerFr.find(">ul").eq(0);
	var $headerDev = $(".header_dev");
	var $cartContent = $(".cart_content");
	var $shopCartArrow = $(".shop_cart_arrow");
	var $wramTip = $(".warm_tip_content");

// 读取购物列表cookie
	var cList = new Array();
	var islogin = 0;
	var cookies = document.cookie.split("; ");
	for(var k=0;k<cookies.length;k++){
		var arr = cookies[k].split("=");
		if(arr[0] == "cartList"){
			cList = JSON.parse(arr[1]);
		}
		if(arr[0] == "username"){
			islogin = 1;
			$headerUl.find(">li").eq(0).hide();
			$headerUl.find(">li").eq(1).hide();
			$headerUl.find(">li").eq(2).hide();

			var $L_ul = $("<ul/>");
			$L_ul.addClass('login_bar');
			for(var i=0;i<4;i++){
				var $L_li = $("<li/>");
				$L_ul.append($L_li);
			}
			$headerDev.append($L_ul);

			$L_ul.find('>li').eq(0).html("<a href='#' title="+arr[1]+">欢迎您,"+arr[1]+"</a><a href='#' title='注册会员'></a>");
			$L_ul.find('>li').eq(1).html("<a href='#'>积分<strong>0</strong></a>");
			$L_ul.find('>li').eq(2).html("<a href='#' class='out'>退出</a>");
			var $M_div = $("<div/>");
			$M_div.addClass('MyHD');
			$M_div.html("<a href='#'><span>我的韩都</span></a><em></em>");
			var $M_div_List = $("<div/>");
			$M_div_List.addClass('MyHD_List');
			for(var i=0;i<4;i++){
				$("<li/>").appendTo($M_div_List);
			}
			$M_div.append($M_div_List);
			$L_ul.find('>li').eq(3).append($M_div);
			$M_div_List.find(">li").eq(0).html("<a href='#'>我的订单</a>");
			$M_div_List.find(">li").eq(1).html("<a href='#'>我的优惠券</a>");
			$M_div_List.find(">li").eq(2).html("<a href='#'>我的收藏</a>");
			$M_div_List.find(">li").eq(3).html("<a href='#'>退货办理</a>");
		}
	}

// 退出按钮绑定点击事件
		var $outBtn = $(".out");
		$outBtn.on("click",function(){
			islogin = 0;
			var now = new Date();
			now.setDate(now.getDate()-1);
			document.cookie = "username=gg" + ";expires=" + now + ";path=/";
			document.cookie = "psw=gg" + ";expires=" + now + ";path=/";
			location.reload();
		});

// 在购物车列表生成ul等
	if(cList.length != 0){
		var totall = 0;
		$shopCartArrow.hide();
		$cartContent.css("height","auto");
		var $c_ul = $("<ul/>");
		$c_ul.addClass('shop_list');
		for(var j=0;j<cList.length;j++){
			var $c_lis = $("<li/>");
			// 创建shop_product
			var $shopProduct = $("<div/>");
			$shopProduct.addClass('shop_product');
			$shopProduct.addClass('clear');
			$shopProduct.attr("data-goodsID",cList[j].gId);
			var $productMsg = $("<div/>");
			$productMsg.addClass('product_msg');
			var $product_a1 = $("<a/>");
			var $product_a2 = $("<a/>");
			var $product_img = $("<img/>");
			var $product_span = $("<span/>");

			$product_a1.attr("href","http://localhost/HD/html/goods.html?goodsID="+cList[j].gId);
			$product_img.attr("src",cList[j].gImg).appendTo($product_a1);
			$product_a1.appendTo($shopProduct);
			$product_a2.attr("href","http://localhost/HD/html/goods.html?goodsID="+cList[j].gId);
			$product_a2.text(cList[j].gTitle);
			$product_a2.appendTo($productMsg);
			$product_span.addClass('size_color');
			$product_span.text("颜色："+cList[j].gColor+" "+"尺码："+cList[j].gSize);
			$product_span.appendTo($productMsg);
			$productMsg.appendTo($shopProduct);
			$shopProduct.appendTo($c_lis);

			// 创建shop_price
			var $shopPrice = $("<div/>");
			$shopPrice.addClass('shop_price');
			$("<del/>").text("￥"+cList[j].oPrice).appendTo($shopPrice);
			$("<br/>").appendTo($shopPrice);
			$("<span/>").text("￥"+parseInt(cList[j].gPrice)).appendTo($shopPrice);
			$shopPrice.appendTo($c_lis);

			// 创建shop_num
			var $shopNum = $("<div/>");
			$shopNum.addClass('shop_num');
			var $num_span1 = $("<span/>");
			$num_span1.addClass('decrease');
			$num_span1.text("-").appendTo($shopNum);
			var $num_input = $("<input/>");
			$num_input.attr("data-inventory",cList[j].gInventory);
			$num_input.attr("value",cList[j].gNum).appendTo($shopNum);
			var $num_span2 = $("<span/>");
			$num_span2.addClass('increase');
			$num_span2.text("+").appendTo($shopNum);
			$shopNum.appendTo($c_lis);

			// 创建shop_money
			var $shopMoney = $("<div/>");
			$shopMoney.addClass('shop_money');
			$shopMoney.text("￥"+parseInt(cList[j].gPrice)*parseInt(cList[j].gNum)+".00");
			$shopMoney.appendTo($c_lis);

			totall += parseInt(cList[j].gPrice)*parseInt(cList[j].gNum);

			// 创建shop_fun
			var $shopFun = $("<div/>");
			$shopFun.addClass('shop_fun');
			var $fun_a1 = $("<a/>");
			$fun_a1.attr("href","#");
			$fun_a1.text("移入收藏夹").appendTo($shopFun);
			$("<br/>").appendTo($shopFun);
			var $fun_a2 = $("<a/>");
			$fun_a2.attr("href","#");
			$fun_a2.addClass('del_btn');
			$fun_a2.text("删除").appendTo($shopFun);
			$shopFun.appendTo($c_lis);

			// 把div插入li
			$c_lis.appendTo($c_ul);

		}
		$c_ul.appendTo($cartContent);

		// 创建totall_money
		$totallMoney = $("<div/>");
		$totallMoney.addClass("totall_money");
		$totallMoney.html("购买金额总计："+"<span class='totallCount'>￥ "+totall+"</span>");
		$totallMoney.appendTo($cartContent);

		// 创建两个button
		var $cShop = $("<button/>");
		$cShop.addClass('c_shop');
		$cShop.insertAfter($cartContent);
		var $bAcount = $("<button/>");
		$bAcount.addClass('b_acount'); 
		$bAcount.insertAfter($cShop);
	}
	else{
		$shopCartArrow.show();
	}


// 给操作中的删除按钮绑定点击事件
	var $delBtn = $(".del_btn");
	$delBtn.on("click",function(e){
		var $currentColor;
		var $currentSize;
		var $currentID = $(this).parents("li").find(".shop_product").attr("data-goodsID");
		var $sizeColor = $(this).parents("li").find(".size_color").text().split(" ");
		for(var i=0;i<$sizeColor.length;i++){
			var arr = $sizeColor[i].split("：");
			if(arr[0]=="颜色"){
				$currentColor = arr[1];
			}
			if(arr[0]=="尺码"){
				$currentSize = arr[1];
			}
		}	
		for(var i=0;i<cList.length;i++){
			if(cList[i].gId == $currentID && cList[i].gSize == $currentSize && cList[i].gColor == $currentColor){
				cList.splice(i,1);
				break;
			}
		}
		$(this).parents("li").remove();
		e.preventDefault();

		// 商品删除后总价更新
		var $shopList = $(".shop_list");
		var $subCount = $(".totallCount");
		var shop_lis = $shopList.find('>li');
		var subprice = 0;
		for(var i=0;i<shop_lis.length;i++){
			var money = $(shop_lis[i]).find(".shop_money").text().split("￥");
			subprice += parseInt(money[1]);
		}
		$subCount.text("￥"+subprice);

		document.cookie = "cartList=" + JSON.stringify(cList) + ";path=/";
	});

// 给数量+-按钮绑定点击事件
	var $s_shopList = $(".shop_list");
	var $decrease = $s_shopList.find(".decrease");
	var $increase = $s_shopList.find('.increase');
	var $s_input = $s_shopList.find(".shop_num").find("input");
	$decrease.on("click",function(){
		var currentNum = parseInt($(this).next().val());
		currentNum--;
		if(currentNum <= 1){
			currentNum = 1;
		}
		$(this).next().val(currentNum);

		var $currentColor;
		var $currentSize;
		var $currentID = $(this).parents("li").find(".shop_product").attr("data-goodsID");
		var $sizeColor = $(this).parents("li").find(".size_color").text().split(" ");
		for(var i=0;i<$sizeColor.length;i++){
			var arr = $sizeColor[i].split("：");
			if(arr[0]=="颜色"){
				$currentColor = arr[1];
			}
			if(arr[0]=="尺码"){
				$currentSize = arr[1];
			}
		}	
		for(var i=0;i<cList.length;i++){
			if(cList[i].gId == $currentID && cList[i].gSize == $currentSize && cList[i].gColor == $currentColor){
				cList[i].gNum = currentNum;
				break;
			}
		}

		// 商品减少后小计更新
		var $current_shopMoney = $(this).parents("li").find(".shop_money");
		var currentAttr = $(this).parents("li").find(".shop_price").find('span').text().split("￥");
		var currentMoney = currentNum * parseInt(currentAttr[1]);
		$current_shopMoney.text("￥"+currentMoney+".00");

		// 商品减少后总价更新
		var $shopList = $(".shop_list");
		var $subCount = $(".totallCount");
		var shop_lis = $shopList.find('>li');
		var subprice = 0;
		for(var i=0;i<shop_lis.length;i++){
			var money = $(shop_lis[i]).find(".shop_money").text().split("￥");
			subprice += parseInt(money[1]);
		}
		$subCount.text("￥ "+subprice);

		document.cookie = "cartList=" + JSON.stringify(cList) + ";path=/";
	});

	$increase.on("click",function(){
		var currentNum = parseInt($(this).prev().val());
		currentNum++;
		if(currentNum > parseInt($(this).prev().attr("data-inventory"))){
			currentNum = parseInt($(this).prev().attr("data-inventory"));
			alert("该商品最多只能购买"+$(this).prev().attr("data-inventory")+"件")
		}
		$(this).prev().val(currentNum);

		var $currentColor;
		var $currentSize;
		var $currentID = $(this).parents("li").find(".shop_product").attr("data-goodsID");
		var $sizeColor = $(this).parents("li").find(".size_color").text().split(" ");
		for(var i=0;i<$sizeColor.length;i++){
			var arr = $sizeColor[i].split("：");
			if(arr[0]=="颜色"){
				$currentColor = arr[1];
			}
			if(arr[0]=="尺码"){
				$currentSize = arr[1];
			}
		}	
		for(var i=0;i<cList.length;i++){
			if(cList[i].gId == $currentID && cList[i].gSize == $currentSize && cList[i].gColor == $currentColor){
				cList[i].gNum = currentNum;
				break;
			}
		}

		// 商品增加后小计更新
		var $current_shopMoney = $(this).parents("li").find(".shop_money");
		var currentAttr = $(this).parents("li").find(".shop_price").find('span').text().split("￥");
		var currentMoney = currentNum * parseInt(currentAttr[1]);
		$current_shopMoney.text("￥"+currentMoney+".00");

		// 商品增加后总价更新
		var $shopList = $(".shop_list");
		var $subCount = $(".totallCount");
		var shop_lis = $shopList.find('>li');
		var subprice = 0;
		for(var i=0;i<shop_lis.length;i++){
			var money = $(shop_lis[i]).find(".shop_money").text().split("￥");
			subprice += parseInt(money[1]);
		}
		$subCount.text("￥ "+subprice);

		document.cookie = "cartList=" + JSON.stringify(cList) + ";path=/";
	});

// 给继续购物按钮绑定点击事件
	var $c_shopBtn = $(".c_shop");
	$c_shopBtn.on("click",function(){
		location.href = "http://localhost/HD/index.html";
	});

// 登录后温馨提示改变
	if(islogin == 1){
		$wramTip.html(" ");
		$wramTip.html("<span>温馨提示：</span>购物车中商品无法保留库存，请您及时下单结算");
	}
	

// 悬浮盒子和悬浮搜索栏的出现和隐藏
	$(window).scroll(function() {
		if($("body").scrollTop()>=50){
			floatBox.fadeIn();
		}
		else{
			if($("body").scrollTop()<=20){
				floatBox.hide();
			}			
		}
	});

	// 给悬浮盒子的top按钮绑定点击事件
	floatBox.children().last().on("click",function(e){
		e.preventDefault();
		$("body").animate({
			scrollTop:0
		});
	});

// 给header的网站导航绑定hover事件
	
	// 网页导航绑定鼠标移入事件
	webNavigation.on("mouseenter",function(){
		webList.show();
	});
	// 网页导航绑定鼠标移出事件
	webNavigation.on('mouseleave',function(){
		webList.hide();
	});
	// 给weblist绑定鼠标移入事件
	webList.on("mouseenter",function(){
		webList.show();
	});
	// weblist绑定鼠标移出事件
	webList.on("mouseleave",function(){
			webList.hide();
	});




	pullListContent.parents("li").on("mouseenter",function(){
		pullListContent.parent().show();
	});
	pullListContent.parents("li").on("mouseleave",function(){
		pullListContent.parent().hide();
	});

// 商品列表hover淡入淡出效果
	
	// 给pullListContent下的li绑定鼠标移入移出事件（事件委托）
	pullListContent.find('>li').on("mouseenter",function(){
		var currentindex = $(this).index();

		pullListContent.find('>div').eq(currentindex).stop().fadeIn(600);
		$(this).css({
			backgroundColor:"#393939",
		});
		$(this).children().css({
			color:"white",
		});
		$(this).find('span').eq(0).css({
			backgroundImage:'url(http://localhost/HD/img/index/tb0' + (currentindex+1) + '.png)',
		});
		$(this).find("h3").stop().animate({
			marginLeft:6,
		},250);
	});
	pullListContent.find('>div').on("mouseenter",function(){
		var currentindex = $(this).index() - pullListContent.find('>li').length;
		$(this).show();

		pullListContent.find('>li').eq(currentindex).css({
			backgroundColor:"#393939",
		});
		pullListContent.find('>li').eq(currentindex).children().css({
			color:"white",
		});
		pullListContent.find('>li').eq(currentindex).find('span').eq(0).css({
			opacity:0,
		});
		pullListContent.find('>li').eq(currentindex).find("h3").stop().animate({
			marginLeft:6,
		},250);
	});

	pullListContent.find('>li').on("mouseleave",function(){
			var currentindex = $(this).index();
			pullListContent.find('>div').eq(currentindex).hide();
			$(this).css({
				backgroundColor:"#e3e3e3",
			});
			$(this).children().css({
				color:"#333",
			});
			$(this).find('span').eq(0).css({
				backgroundImage:'url(http://localhost/HD/img/index/tb' + (currentindex+1) + '.png)',
			});
			$(this).find("h3").stop(true).animate({
				marginLeft:0,
			},250);
	});
	pullListContent.find('>div').on("mouseleave",function(){
		var currentindex = $(this).index() - pullListContent.find('>li').length;
		$(this).hide();

		pullListContent.find('>li').eq(currentindex).css({
			backgroundColor:"#e3e3e3",
		});
		pullListContent.find('>li').eq(currentindex).children().css({
			color:"#333",
		});
		pullListContent.find('>li').eq(currentindex).find('span').eq(0).css({
			opacity:1,
		});
		pullListContent.find('>li').eq(currentindex).find("h3").stop(true).animate({
			marginLeft:0,
		},250);
	});

	













	// 友情链接轮播效果
	
	var wrun = function(){
		var speed = 1;
		var currentLeft = $webLink.css("left");
		var Left = parseInt(currentLeft)-speed;
		if(parseInt(currentLeft)<-785){
			Left = 0;
		}
		$webLink.css("left",Left);
	}

	var wTimer = setInterval(wrun, 30);

	// 鼠标移入轮播效果停止移出继续轮播
	$webLinkShow.on("mouseenter",function(){
		clearInterval(wTimer);
	});
	$webLinkShow.on("mouseleave",function(){
		wTimer = setInterval(wrun, 30);
	});
})