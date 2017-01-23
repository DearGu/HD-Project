$(function(){
	var webNavigation = $(".web_navigation");
	var webList = $(".weblist");
	var pullListContent = $(".pullList_content");
	var carousel = $(".Carousel");
	var tab = $(".tab");
	var $change = $(".change");
	var $companyList = $(".company_list");
	var $tabBrand = $(".tab_brand");
	var $goodsShow = $(".goods_show");
	var $newsTitle = $(".news_title");
	var $newsContent = $(".news_content");
	var $hotSale = $(".hot_sale");
	var $webLinkShow = $(".web_link_show");
	var $webLink = $webLinkShow.find("ul");
	var $HFList = $(".HF_goodslist");
	var $DIList = $(".DI_goodslist");
	var $NNList = $(".NN_goodslist");
	var $MHList = $(".MH_goodslist");
	var $NBSList = $(".NBS_goodslist");
	var xfSearch = $("#xf_search");
	var floatBox = $(".float_box");
	var $headerFr = $(".header_fr");
	var $headerUl = $headerFr.find(">ul").eq(0);
	var $headerDev = $(".header_dev");

	// 判断是否为登录状态
	var cookies = document.cookie.split("; ");
	for(var i=0;i<cookies.length;i++){
		var arr = cookies[0].split("=");
		if(arr[0] == "username"){
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
			var now = new Date();
			now.setDate(now.getDate()-1);
			document.cookie = "username=gg" + ";expires=" + now + ";path=/";
			document.cookie = "psw=gg" + ";expires=" + now + ";path=/";
			location.href = "http://localhost/HD/index.html";
		});





	// 从数据库中读取数据并显示在页面上
	$.get("php/index.php",function(data){
		var res = JSON.parse(data);
		// console.log(res);
		for(var i=0;i<res.length;i++){
			// 新品上架商品
			if(res[i].msg == "新品韩风女装"){
				var $glis = $goodsShow.find('>ul').eq(0).children();
				$glis.each(function(idx, item) {
					$(item).find("img").attr({
						src:res[i].data[idx].goodsImg,
						alt:res[i].data[idx].goodsTitle
					});
					$(item).find('a').attr("title",res[i].data[idx].goodsTitle);
					$(item).find(".money").text(res[i].data[idx].goodsPrice + ".00");
					$(item).find(".old_money").text(res[i].data[idx].goodsOldPrice + ".00");
				});
			}
			if(res[i].msg == "新品甜美少女"){
				var $glis = $goodsShow.find('>ul').eq(1).children();
				$glis.each(function(idx, item) {
					$(item).find("img").attr({
						src:res[i].data[idx].goodsImg,
						alt:res[i].data[idx].goodsTitle
					});
					$(item).find('a').attr("title",res[i].data[idx].goodsTitle);
					$(item).find(".money").text(res[i].data[idx].goodsPrice + ".00");
					$(item).find(".old_money").text(res[i].data[idx].goodsOldPrice + ".00");
				});
			}
			if(res[i].msg == "新品迪葵纳"){
				var $glis = $goodsShow.find('>ul').eq(2).children();
				$glis.each(function(idx, item) {
					$(item).find("img").attr({
						src:res[i].data[idx].goodsImg,
						alt:res[i].data[idx].goodsTitle
					});
					$(item).find('a').attr("title",res[i].data[idx].goodsTitle);
					$(item).find(".money").text(res[i].data[idx].goodsPrice + ".00");
					$(item).find(".old_money").text(res[i].data[idx].goodsOldPrice + ".00");
				});
			}
			if(res[i].msg == "新品简约女装"){
				var $glis = $goodsShow.find('>ul').eq(3).children();
				$glis.each(function(idx, item) {
					$(item).find("img").attr({
						src:res[i].data[idx].goodsImg,
						alt:res[i].data[idx].goodsTitle
					});
					$(item).find('a').attr("title",res[i].data[idx].goodsTitle);
					$(item).find(".money").text(res[i].data[idx].goodsPrice + ".00");
					$(item).find(".old_money").text(res[i].data[idx].goodsOldPrice + ".00");
				});
			}
			if(res[i].msg == "新品韩风童装"){
				var $glis = $goodsShow.find('>ul').eq(4).children();
				$glis.each(function(idx, item) {
					$(item).find("img").attr({
						src:res[i].data[idx].goodsImg,
						alt:res[i].data[idx].goodsTitle
					});
					$(item).find('a').attr("title",res[i].data[idx].goodsTitle);
					$(item).find(".money").text(res[i].data[idx].goodsPrice + ".00");
					$(item).find(".old_money").text(res[i].data[idx].goodsOldPrice + ".00");
				});
			}
			// 韩都衣舍商品
			if(res[i].msg == "韩都衣舍"){
				var $HFlis1 = $HFList.find('>ul').eq(0).children();
				var $HFlis2 = $HFList.find('>ul').eq(1).children();
				$HFlis1.each(function(idx, item) {
					$(item).find("img").attr({
						src:res[i].data[idx].goodsImg,
						alt:res[i].data[idx].goodsTitle
					});
					$(item).find('a').attr("title",res[i].data[idx].goodsTitle);
					$(item).find(".money").text(res[i].data[idx].goodsPrice + ".00");
					$(item).find(".old_money").text(res[i].data[idx].goodsOldPrice + ".00");
				});
				$HFlis2.each(function(idx, item) {
					$(item).find("img").attr({
						src:res[i].data[idx+5].goodsImg,
						alt:res[i].data[idx+5].goodsTitle
					});
					$(item).find('a').attr("title",res[i].data[idx+5].goodsTitle);
					$(item).find(".money").text(res[i].data[idx+5].goodsPrice + ".00");
					$(item).find(".old_money").text(res[i].data[idx+5].goodsOldPrice + ".00");
				});
			}

			// 迪葵纳商品
			if(res[i].msg == "迪葵纳"){
				var $DIlis = $DIList.find('>ul').eq(0).children();
				$DIlis.each(function(idx, item) {
					$(item).find("img").attr({
						src:res[i].data[idx].goodsImg,
						alt:res[i].data[idx].goodsTitle
					});
					$(item).find('a').attr("title",res[i].data[idx].goodsTitle);
					$(item).find(".money").text(res[i].data[idx].goodsPrice + ".00");
					$(item).find(".old_money").text(res[i].data[idx].goodsOldPrice + ".00");
				});
			}

			// 娜娜日记商品
			if(res[i].msg == "娜娜日记"){
				var $NNlis = $NNList.find('>ul').eq(0).children();
				$NNlis.each(function(idx, item) {
					$(item).find("img").attr({
						src:res[i].data[idx].goodsImg,
						alt:res[i].data[idx].goodsTitle
					});
					$(item).find('a').attr("title",res[i].data[idx].goodsTitle);
					$(item).find(".money").text(res[i].data[idx].goodsPrice + ".00");
					$(item).find(".old_money").text(res[i].data[idx].goodsOldPrice + ".00");
				});
			}

			// 米妮哈鲁商品
			if(res[i].msg == "米妮哈鲁"){
				var $MHlis = $MHList.find('>ul').eq(0).children();
				$MHlis.each(function(idx, item) {
					$(item).find("img").attr({
						src:res[i].data[idx].goodsImg,
						alt:res[i].data[idx].goodsTitle
					});
					$(item).find('a').attr("title",res[i].data[idx].goodsTitle);
					$(item).find(".money").text(res[i].data[idx].goodsPrice + ".00");
					$(item).find(".old_money").text(res[i].data[idx].goodsOldPrice + ".00");
				});
			}

			// 尼班诗商品
			if(res[i].msg == "尼班诗"){
				var $NBSlis = $NBSList.find('>ul').eq(0).children();
				$NBSlis.each(function(idx, item) {
					$(item).find("img").attr({
						src:res[i].data[idx].goodsImg,
						alt:res[i].data[idx].goodsTitle
					});
					$(item).find('a').attr("title",res[i].data[idx].goodsTitle);
					$(item).find(".money").text(res[i].data[idx].goodsPrice + ".00");
					$(item).find(".old_money").text(res[i].data[idx].goodsOldPrice + ".00");
				});
			}
		}
		
	});
	
	// 悬浮盒子和悬浮搜索栏的出现和隐藏
	$(window).scroll(function() {
		if($("body").scrollTop()>=770){
			xfSearch.slideDown();
			floatBox.fadeIn();
		}
		else{
			xfSearch.slideUp();
			if($("body").scrollTop()<=250){
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
			backgroundImage:'url(img/index/tb0' + (currentindex+1) + '.png)',
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
				backgroundImage:'url(img/index/tb' + (currentindex+1) + '.png)',
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

// 轮播图

	var index=0;
	var run = function(){
		if(index>=3){
			index=0;
			carousel.find('a').eq(index).fadeIn(1500);
			
		}
		carousel.find('a').eq(index-1).fadeOut(1500);
		carousel.find('a').eq(index).fadeIn(800);
		
		// 轮播图标签随着轮播图改变
		tab.find("li").removeClass('selected');
		tab.find('li').eq(index).addClass('selected');
	}

	var timer = setInterval(function(){
		index++;
		run();
	}, 5000);

	carousel.on("mouseenter",function(){
			clearInterval(timer);
	});
	carousel.on("mouseleave",function(){
		timer = setInterval(function(){
			index++;
			run();
		}, 5000);
	});

	tab.find('li').on("mouseenter",function(){
		clearInterval(timer);
		index = $(this).index();
		carousel.find('a').each(function(idx, item) {
			if(idx != index){
				$(item).fadeOut(700);
			}
		});
		tab.find("li").removeClass("selected");

		carousel.find('a').eq(index).fadeIn(700);
		tab.find("li").eq(index).addClass("selected");
	});

// 换一批

	// 给companyList设置定时器轮播
	var clIndex = 0;
	var clrun = function(){
		if(clIndex>1){
				clIndex = 0;
				$companyList.find('ul').eq(clIndex).show();
			}
			$companyList.find('ul').eq(clIndex-1).hide();
			$companyList.find('ul').eq(clIndex).show();
	}
	var clTimer = setInterval(function(){
			clIndex++;
			clrun();
	}, 10000);

	// 鼠标移入（移出）停止（开启）轮播
	$companyList.on("mouseenter",function(){
			clearInterval(clTimer);
	});
	$companyList.on("mouseleave",function(){
		clTimer = setInterval(function(){
				clIndex++;
				clrun();
		}, 10000);
	});

	// 换一批按钮绑定点击事件
	$change.on("click",function(e){
		clIndex++;
		clrun();
		e.preventDefault();
	});

	// 鼠标移入移出logo换变化
	$companyList.find('ul').find('img').on("mouseenter",function(){
			var path = $(this).attr("src").slice(0,-4);
			$(this).attr("src",path + "-.jpg");
	});
	$companyList.find('ul').find('img').on("mouseleave",function(){
			var path = $(this).attr("src").slice(0,-5);
			$(this).attr("src",path + ".jpg");
	});

	// 动态新闻鼠标移入标题新闻会改变
	$newsTitle.find("ul").on("mouseenter","li",function(){
			var currentindex = $(this).index();
			$newsTitle.find("ul").children().removeClass("on");
			$(this).addClass("on");
			$newsContent.find('>div').hide();
			$newsContent.find('>div').eq(currentindex).show();
	});

// 新品上市轮播

	var gIndex = 0;
	var grun = function(){
		if(gIndex>4){
			gIndex = 0;
			$goodsShow.find('ul').eq(gIndex).fadeIn(1500);
		}
		$goodsShow.find('ul').eq(gIndex-1).fadeOut(1500);
		$goodsShow.find('ul').eq(gIndex).fadeIn(800);

		$tabBrand.find('li').removeClass("current");
		$tabBrand.find('li').eq(gIndex).addClass('current');
	}
	var gTimer = setInterval(function(){
		gIndex++;
		grun();
	}, 3000);

	// 移入(移出)goodsShow会停止(继续)轮播
	$goodsShow.on("mouseenter",function(){
		clearInterval(gTimer);
	});

	$goodsShow.on("mouseleave",function(){
		gTimer = setInterval(function(){
			gIndex++;
			grun();
		}, 3000);
	});

	// 移入tabBrand轮播图改变
	$tabBrand.on("mouseenter","li",function(){
		clearInterval(gTimer);
		gIndex = $(this).index();
		$tabBrand.find('li').removeClass("current");
		$(this).addClass('current');
		$goodsShow.find('ul').each(function(idx, item) {
			if(idx != gIndex){
				$(item).fadeOut();
			}
		});
		$goodsShow.find('ul').eq(gIndex).fadeIn(300);
	});
	$tabBrand.on("mouseleave","li",function(){
		gTimer = setInterval(function(){
			gIndex++;
			grun();
		}, 3000);
	});

// 热门排行手风琴效果

	$hotSale.find(">ul").on("mouseenter",">li",function(){
		$hotSale.find(">ul").find('.hot_icon').hide();
		$hotSale.find(">ul").find('h2').show();
		$(this).find('h2').hide();
		$(this).find(">.hot_icon").show();
	});

	// 取消订阅按钮的表单提交默认行为
	var $dy = $(".dy");
	$dy.find(":submit").on("click",function(e){
		e.preventDefault();
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