$(function(){
	var webNavigation = $(".web_navigation");
	var webList = $(".weblist");
	var pullListContent = $(".pullList_content");
	var $webLinkShow = $(".web_link_show");
	var $webLink = $webLinkShow.find("ul");
	var floatBox = $(".float_box");
	var $msgWrap = $(".msg_wrap");
	var $msgBtn = $(".msg_btn");
	var $errorMsg = $(".error_msg");
	var $yzm = $(".yzm");
	var resRandom = "";

	
	// 生成随机4位的验证码
	var randomYZM = function(){
		var str = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
		var Rnum = "";
		for(var i=0;i<4;i++){
			var MR =Math.floor(Math.random()*(str.length));
			Rnum += str[MR];
		}
		resRandom = Rnum;
	}

	randomYZM();
	$yzm.text(resRandom);




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

	// 登录信息框获得焦点时边框变成黑色
	$msgWrap.find("input").on("focus",function(){
		$msgWrap.find("input").css({
			borderColor:"#eee"
		});
		$(this).css({
			borderColor:"black"
		});
	});
	// 登录信息框失去焦点时边框变成灰色
	$msgWrap.find("input").on("blur",function(){
		$(this).css({
			borderColor:"#eee"
		});
	});


	// 给立即登录按钮绑定点击事件
	$msgBtn.on("click",function(){
		var $username = $msgWrap.find("input").eq(0).val();
		var $psw = $msgWrap.find("input").eq(1).val();
		var $ynum = $msgWrap.find("input").eq(2).val();
		var $saveMsg = $(".save_msg");

		$errorMsg.hide();
		$msgWrap.last().css({
				marginBottom:21
			});

		if($username.trim() == "" || !/^[\w\.\-]+@[a-zA-Z0-9\-]+(\.[a-zA-Z]+){1,2}$/.test($username) && !/^1[34578]\d{9}$/.test($username)){
			$errorMsg.text("请输入正确的E-Mail");
			$msgWrap.last().css({
				marginBottom:0
			});
			$errorMsg.show();
			randomYZM();
			$yzm.text(resRandom);
			return;
		}
		else if($psw.trim() == ""){
			$errorMsg.text("请输入密码");
			$msgWrap.last().css({
				marginBottom:0
			});
			$errorMsg.show();
			randomYZM();
			$yzm.text(resRandom);
			return;
		}
		else if($ynum.trim() == ""){
			$errorMsg.text("验证码不能为空");
			$msgWrap.last().css({
				marginBottom:0
			});
			$errorMsg.show();
			randomYZM();
			$yzm.text(resRandom);
			return;
		}
		else if($ynum != resRandom){
			$errorMsg.text("验证码错误");
			$msgWrap.last().css({
				marginBottom:0
			});
			$errorMsg.show();
			randomYZM();
			$yzm.text(resRandom);
			return;
		}
		$.post('http://localhost/HD/php/login.php', {username:$username,psw:$psw}, function(data) {
			var res = JSON.parse(data);
			console.log(res);
			if(res.msg == "success"){
				document.cookie = "username=" + $username + ";path=/";
				document.cookie = "psw=" + $psw + ";path=/";
				location.href = "http://localhost/HD/index.html";
				if($saveMsg.find(":checkbox").is(":checked")){
					var now = new Date();
					now.setDate(now.getDate()+30);
					document.cookie = "username=" + $username + ";expires=" + now +";path=/";
					document.cookie = "psw=" + $psw + ";expires=" + now +";path=/";
				}		 		
			}
			else if(res.msg == "fail"){
				$errorMsg.text("用户名或密码错误");
				$msgWrap.last().css({
				marginBottom:0
				});
				$errorMsg.show();
				randomYZM();
				$yzm.text(resRandom);
			}
		});


	});

	// 点击验证码重新随机出新的验证码
	$yzm.on("click",function(){
		randomYZM();
		$yzm.text(resRandom);
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