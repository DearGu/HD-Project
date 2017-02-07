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
	var $sizeList = $(".size_list");
	var $sizeVal = $(".size_val");
	var $colorList = $(".color_list");
	var $colorVal = $(".color_val");
	var $minus = $(".minus");
	var $plus = $(".plus");
	var $buyNum = $(".buy_number");
	var $smallShow = $(".small_show");
	var $showZone = $(".show_zone");
	var $bigShowZone = $(".bigshow_zone");
	var $enlargeArea = $(".enlarge_area");
	var $tabBar = $(".tabBar");
	var $goodsTitle = $(".goods_title");
	var $goodsStyle = $(".goods_style");
	var $goodsMsg = $(".goods_msg");
	var $attrList = $(".attr_list");
	var $imgShow = $(".imgShow");
	var $detailsArea = $(".details_area");
	var $addCartBtn = $(".addCart_btn");
	var account;
	var mPrice;
	// 创建空的购物车列表
	var cartList = new Array();
	var cookieCheck = 0;

	// 根据search参数获取商品的信息
	var gID = location.search.split("=")[1];
	$.get('http://localhost/HD/php/goods.php',{goodsID:gID},function(data) {
		var res = JSON.parse(data);
		// console.log(res);
		// var goodsData = res.data[0];
		if(res.msg == "success"){
			// console.log(goodsData);
			var goodsData = res.data[0];
			$goodsTitle.text(goodsData.goodsTitle);
			$goodsStyle.text(goodsData.style);
			$showZone.find("img").attr({
				src:"http://localhost/HD/img/goods/"+goodsData.img_b
			});
			// 加载大图
			$bigShowZone.find("img").attr({
				src:"http://localhost/HD/img/goods/"+goodsData.img_b
			});
			// 加载小图片
			$smallShow.find('li').eq(0).find('>img').attr({
				src:"http://localhost/HD/img/goods/"+goodsData.img_s1
				});
			$smallShow.find('li').eq(1).find('>img').attr({
				src:"http://localhost/HD/img/goods/"+goodsData.img_s2
				});
			$smallShow.find('li').eq(2).find('>img').attr({
				src:"http://localhost/HD/img/goods/"+goodsData.img_s3
				});
			$smallShow.find('li').eq(3).find('>img').attr({
				src:"http://localhost/HD/img/goods/"+goodsData.img_s4
				});
			$smallShow.find('li').eq(4).find('>img').attr({
				src:"http://localhost/HD/img/goods/"+goodsData.img_s5
				});
			// 加载商品信息
			$goodsMsg.find('.produce_name').text(goodsData.goodsTitle);
			$goodsMsg.find('.Art_NO').text(goodsData.Art_Num);
			$goodsMsg.find('.market_price').text(goodsData.goodsOldPrice+".00");
			$goodsMsg.find('.promote_price').text(goodsData.goodsPrice+".00");
			$goodsMsg.find('.sale_count').text(goodsData.sales);
			$goodsMsg.find('.inventory').text(goodsData.inventory);
			$goodsMsg.find('.size_list').html("");
			mPrice = parseInt(goodsData.goodsPrice);
			var sizeList_arr = goodsData.size.split(",");
			for(var i=0;i<sizeList_arr.length;i++){
				var $newlis = $("<li/>");
				if(i==0){
					$newlis.addClass('attr_selected');
				}
				$newlis.html(sizeList_arr[i]+"<em></em>").appendTo($goodsMsg.find('.size_list'));

			}
			$goodsMsg.find('.color_list').html("");
			var colorList_arr = goodsData.color.split(",");
			for(var i=0;i<colorList_arr.length;i++){
				var $newlis = $("<li/>");
				if(i==0){
					$newlis.addClass('attr_selected');
				}
				$newlis.html(colorList_arr[i]+"<em></em>").appendTo($goodsMsg.find('.color_list'));

			}

			$goodsMsg.find(".size_val").text($goodsMsg.find('.size_list').find("li").eq(0).text());
			$goodsMsg.find(".color_val").text($goodsMsg.find('.color_list').find("li").eq(0).text());

			// 加载商品详情的商品信息
			$attrList.find("li").eq(0).text("品牌："+goodsData.style);
			$attrList.find("li").eq(1).text("货号："+goodsData.Art_Num);
			var sizemsg = "";
			for(var i=0;i<sizeList_arr.length;i++){
				sizemsg += sizeList_arr[i] + ' ';
			}
			$attrList.find("li").eq(2).text("货号："+sizemsg);
			var colormsg = "";
			for(var i=0;i<colorList_arr.length;i++){
				colormsg += colorList_arr[i] + ' ';
			}
			$attrList.find("li").eq(3).text("货号："+colormsg);

			// 加载商品详情图片
			$imgShow.html("");
			for(var i=0;i<goodsData.detailsNum;i++){
				var imgs = $("<img/>");
				imgs.attr("src","http://localhost/HD/img/goods/"+goodsData["img_details"+i]);
				imgs.appendTo($imgShow);
			}
			$("<span/>").text('没空去韩国？就来韩都衣舍官网！韩都衣舍官网，网上购物首选。').appendTo($imgShow);
		}
		else if(res.msg == "fail"){
			console.log(666);
			alert("页面跑远了，即将返回首页!");
			location.href = "http://localhost/HD/index.html";
		}	
	});

	// 获取当前cookies
	var cookies = document.cookie.split("; ");
	for(var i=0;i<cookies.length;i++){
		var arr = cookies[i].split("=");
		if(arr[0] == "cartList"){
			cartList = JSON.parse(arr[1]);
		}
	}




	// 判断是否为登录状态
	var cookies = document.cookie.split("; ");
	var islogin = 0;
	for(var i=0;i<cookies.length;i++){
		var arr = cookies[i].split("=");
		if(arr[0] == "username"){
			islogin = 1;
			account = arr[1];
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
			document.cookie = "cartList=gg" + ";expires=" + now + ";path=/";
			location.reload();
		});



	// 如果登录了检测个人是否存在购物车列表
	if(islogin == 1){
		var res_data = new Array();
		// 读取个人的购物车列表
		$.post("http://localhost/HD/php/cart_select.php",{username:account},function(data){
			var res = JSON.parse(data);
			if(res.msg == "success"){
				res_data = JSON.parse(res.data[0].shoplist);
				if(cartList.length==0 && res_data.length > 0){
					cartList = res_data;
					document.cookie = "cartList=" + JSON.stringify(cartList) + ";path=" + "/";
				}
				else if(cartList.length >0 && res_data.length > 0){
					// console.log(cookieCheck);
					// 判断cookie的购物车列表是否与后台购物车列表相同，若相同则融合
					for(var m=0;m<cartList.length;m++){
						if(cartList[m].gId != res_data[m].gId || cartList[m].gImg != res_data[m].gImg || cartList[m].gTitle != res_data[m].gTitle || cartList[m].gSize != res_data[m].gSize || cartList[m].gColor != res_data[m].gColor || cartList[m].oPrice != res_data[m].oPrice || cartList[m].gPrice != res_data[m].gPrice || cartList[m].gNum != res_data[m].gNum || cartList[m].gInventory != res_data[m].gInventory){
							break;
						}
					}
					if(m==cartList.length){
						cookieCheck = 1;
					}

					if(cookieCheck == 0){
						for(var i=0;i<res_data.length;i++){
							for(var j=0;j<cartList.length;j++){
								if(cartList[j].gId == res_data[i].gId && cartList[j].gSize == res_data[i].gSize && cartList[j].gColor == res_data[i].gColor){
									cartList[j].gNum = parseInt(cartList[j].gNum) + parseInt(res_data[i].gNum);
									break;
								}
							}
							if(j==cartList.length){
									cartList.push(res_data[i]);
							}
						}
						document.cookie = "cartList=" + JSON.stringify(cartList) + ";path=" + "/";
					}
					
				}	
				else if(cartList.length >0 && res_data.length == 0){
					res_data = cartList;
					var mm = JSON.stringify(res_data);
					$.post("http://localhost/HD/php/goods_update.php",{username:account,cartlist:mm},function(data){
						});
				}
			}
			if(res.msg == "fail"){
				res_data = cartList;
				var cc = JSON.stringify(res_data);
				$.post("http://localhost/HD/php/goods_update.php",{username:account,cartlist:cc},function(data){
					});
			}	
		});
		
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

	// 商品信息的尺码和颜色按钮绑定点击事件
	$sizeList.on("click","li",function(){
		$sizeList.find("li").removeClass('attr_selected');
		$(this).addClass('attr_selected');
		$sizeVal.text($(this).text());
	});
	$colorList.on("click","li",function(){
		$colorList.find('li').removeClass('attr_selected');
		$(this).addClass('attr_selected');
		$colorVal.text($(this).text());
	});

	// 购买数量的加减按钮绑定点击事件
	$minus.on("click",function(){
		var currentNum = parseInt($buyNum.val());
		currentNum--;
		if(currentNum<0){
			currentNum = 0;
		}
		$buyNum.val(currentNum);
	});
	$plus.on("click",function(){
		var currentNum = parseInt($buyNum.val());
		currentNum++;
		$buyNum.val(currentNum);
	});
	// 输入框绑定改变触发事件
	$buyNum.on("change",function(){
		var currentNum = parseInt($buyNum.val());
		if(!currentNum || !/\d/.test(currentNum)){
			alert("请输入正确的购买数量");
			currentNum = 1;
			$buyNum.val(currentNum);
		}
	});
	// 给商品小图片绑定点击事件
	$smallShow.on("click","li",function(){
		$smallShow.find('li').removeClass('sm_selected');
		$showZone.find('img').attr("src",$(this).find('img').attr("src"));
		$bigShowZone.find('img').attr("src",$(this).find('img').attr("src"));
		$(this).addClass('sm_selected');
	});

	// 放大镜功能
	$showZone.on("mouseenter",function(){
		$enlargeArea.show();
		$bigShowZone.fadeIn();
		$(document).on("mousemove",function(e){
			$enlargeArea.css({
				left:e.clientX - $showZone.offset().left - $enlargeArea.outerWidth()/2,
				top:e.clientY - $showZone.offset().top - $enlargeArea.outerHeight()/2 + $(window).scrollTop()
			});
			if(parseInt($enlargeArea.offset().left) <= $showZone.offset().left){
				$enlargeArea.css("left",0);
			}
			if(parseInt($enlargeArea.offset().left) >= $showZone.offset().left + $showZone.outerWidth()- $enlargeArea.outerWidth()){
				$enlargeArea.css("left",$showZone.outerWidth()- $enlargeArea.outerWidth());
			}
			if(parseInt($enlargeArea.offset().top) <= $showZone.offset().top){
				$enlargeArea.css("top",0);
			}
			if(parseInt($enlargeArea.offset().top) >= $showZone.offset().top + $showZone.outerHeight()- $enlargeArea.outerHeight()){
				$enlargeArea.css("top",$showZone.outerHeight()- $enlargeArea.outerHeight());
			}
			$bigShowZone.find("img").css({
				left:parseInt($enlargeArea.css("left"))*-(800/480),
				top:parseInt($enlargeArea.css("top"))*-(800/480)
			})
		});	
		
	});
	$showZone.on("mouseleave",function(){
		$enlargeArea.hide();
		$bigShowZone.fadeOut();
		$(document).off("mousemove");
	});

	// tabBar点击转换标签
	$tabBar.on("click","li",function(e){
		$tabBar.find('li').removeClass('tabBar_selected');
		$(this).addClass('tabBar_selected');
		e.preventDefault();
		$detailsArea.find(">li").hide();
		$detailsArea.find(">li").eq($(this).index()).show();
	});

	// tabBar悬浮
	$(document).on("scroll",function(){
		if($("body").scrollTop() >= 920){
			$tabBar.addClass('tabBar_fixed');
			$tabBar.find(".quickAddCart").show();
		}
		else{
			$tabBar.removeClass('tabBar_fixed');
			$tabBar.find(".quickAddCart").hide();
		}
	});

	// 给加入购物车按钮绑定点击事件
	$addCartBtn.on("click",function(){
		if(parseInt($buyNum.val()) > parseInt($goodsMsg.find('.inventory').text())){
			alert("商品数量不能大于库存数量");
			return;
		}
		else if(parseInt($buyNum.val()) <= 0){
			alert("请输入正确的购买数量");
			return;
		}
		else{
			// 重点（点击时更新cookie数据）
			var cookies = document.cookie.split("; ");
			for(var i=0;i<cookies.length;i++){
				var arr = cookies[i].split("=");
				if(arr[0] == "cartList"){
					cartList = JSON.parse(arr[1]);
				}
			}

			var goodsObject = {};
			goodsObject.gId = gID;
			goodsObject.gImg = $showZone.find("img").attr("src");
			goodsObject.gTitle = $goodsMsg.find(".produce_name").text();
			goodsObject.gSize = $sizeVal.text();
			goodsObject.gColor = $colorVal.text();
			goodsObject.oPrice = $goodsMsg.find('.market_price').text();
			// goodsObject.gPrice = $goodsMsg.find('.promote_price').text();
			goodsObject.gPrice = mPrice;
			goodsObject.gNum = $buyNum.val();
			goodsObject.gInventory = $goodsMsg.find('.inventory').text();
			
			if(cartList.length == 0){
				cartList.push(goodsObject);
			}
			else{
				for(var i=0;i<cartList.length;i++){
					if(cartList[i].gId == goodsObject.gId && cartList[i].gSize == goodsObject.gSize && cartList[i].gColor == goodsObject.gColor){
							cartList[i].gNum = parseInt(cartList[i].gNum) + parseInt(goodsObject.gNum);
							break;
					}
				}
				if(i==cartList.length){
					cartList.push(goodsObject);
				}
			}
			// 将购物车列表写入cookie
			document.cookie = "cartList=" + JSON.stringify(cartList) + ";path=" + "/";
			var kk = JSON.stringify(cartList);
			if(islogin == 1){
					$.post("http://localhost/HD/php/goods_update.php",{username:account,cartlist:kk},function(data){
					});				
				}
			alert("商品添加成功");	
		}
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