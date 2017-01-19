$(function(){
	// 给header的网站导航绑定hover事件
	var webNavigation = $(".web_navigation");
	var webList = $(".weblist");
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
	var pullListContent = $(".pullList_content");
	// 给pullListContent下的li绑定鼠标移入移出事件（事件委托）
	pullListContent.find('>li').on("mouseenter",function(){
		var currentindex = $(this).index();
		pullListContent.find('>div').eq(currentindex).fadeIn();
		$(this).css({
			backgroundColor:"#393939",
		});
		$(this).children().css({
			color:"white",
		});
		$(this).find('span').eq(0).css({
			backgroundImage:'url(img/index/tb0' + (currentindex+1) + '.png)',
		});
		$(this).find("h3").animate({
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
	var carousel = $(".Carousel");
	var tab = $(".tab");
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
		carousel.find('a').eq(index-1).fadeOut(700);
		tab.find("li").removeClass("selected");

		carousel.find('a').eq(index).fadeIn(700);
		tab.find("li").eq(index).addClass("selected");
	})
})