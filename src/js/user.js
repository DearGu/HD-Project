$(function(){
	var webNavigation = $(".web_navigation");
	var webList = $(".weblist");
	var pullListContent = $(".pullList_content");
	var $webLinkShow = $(".web_link_show");
	var $webLink = $webLinkShow.find("ul");
	var $headerFr = $(".header_fr");
	var $headerUl = $headerFr.find(">ul").eq(0);
	var $headerDev = $(".header_dev");

	// 判断是否为登录状态
	var cookies = document.cookie.split("; ");
	var islogin = 0;
	for(var i=0;i<cookies.length;i++){
		var arr = cookies[i].split("=");
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
	if(islogin==0){
		location.href = "http://localhost/HD/html/login.html";
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
			location.href = "http://localhost/HD/html/login.html";
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