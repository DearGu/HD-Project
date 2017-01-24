$(function(){
	var webNavigation = $(".web_navigation");
	var webList = $(".weblist");
	var pullListContent = $(".pullList_content");
	var $webLinkShow = $(".web_link_show");
	var $webLink = $webLinkShow.find("ul");
	var floatBox = $(".float_box");
	var $yzm = $(".yzm");
	var resRandom = "";
	var $registerWrap = $(".register_wrap");
	var $registerBtn = $(".register_Btn");
	var $quickBtn = $(".quick_Btn");

	
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

	
	// 点击验证码重新随机出新的验证码
	$yzm.on("click",function(){
		randomYZM();
		$yzm.text(resRandom);
	});

	// 填写信息输入框内容改变时检测是否存在错误
	// 用来检测信息是否存在错误
	var check = [0,0,0,0];
	$registerWrap.eq(0).find('input').on("blur",function(){
		var $email = $registerWrap.eq(0).find('input').val();
		if($email.trim() == "" || !/^[\w\.\-]+@[a-zA-Z0-9\-]+(\.[a-zA-Z]+){1,2}$/.test($email)){
			$(".error_tip_e").text("请填写E-mail");
			check[0] = 0;
			return;
		}
		else{
			$.post("http://localhost/HD/php/register_check.php",{username:$email},function(data){
					var res = JSON.parse(data);
					if(res.msg == "fail"){
						$(".error_tip_e").text("该E-mail已被注册");
						check[0] = 0;
						return;
					}
					else{
						$(".error_tip_e").html("<img src='http://localhost/HD/img/register/keyizhuce.gif' />");
						check[0] = 1;
					}
				});
		}
	});
	$registerWrap.eq(1).find('input').on("blur",function(){
		var $Rpsw = $registerWrap.eq(1).find('input').val();
		if($Rpsw.trim() == "" || $Rpsw.length < 8){
			$(".error_tip_p").text("密码长度不能小于8位");
			check[1] = 0;
			return;
		}
		else if(!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,24}$/.test($Rpsw)){
			$(".error_tip_p").text("密码必须为8-24位字母与数字组合");
			check[1] = 0;
			return;
		}
		else{
			$(".error_tip_p").html("<img src='http://localhost/HD/img/register/keyizhuce.gif' />");
			check[1] = 1;
		}
	});
	$registerWrap.eq(2).find('input').on("blur",function(){
		var $Rcpsw = $registerWrap.eq(2).find('input').val();
		var $Rpsw = $registerWrap.eq(1).find('input').val();
		if($Rcpsw.trim() == "" || $Rcpsw.length < 8){
			$(".error_tip_cp").text("密码长度不能小于8位");
			check[2] = 0;
			return;
		}
		else if($Rcpsw != $Rpsw){
			$(".error_tip_cp").text("两次输入的密码不一致");
			check[2] = 0;
			return;
		}
		else{
			$(".error_tip_cp").html("<img src='http://localhost/HD/img/register/keyizhuce.gif' />");
			check[2] = 1;
		}
	});
	$registerWrap.eq(3).find('input').on("blur",function(){
		var $Ryzm = $registerWrap.eq(3).find('input').val();
		if($Ryzm.trim() == "" || $Ryzm != resRandom){
			$(".error_tip_y").text("验证码不正确");
			check[3] = 0;
			return;
		}
		else{
			$(".error_tip_y").html("<img src='http://localhost/HD/img/register/keyizhuce.gif' />");
			check[3] = 1;
		}
	});

	// 给同意注册按钮绑定点击事件
	$registerBtn.on("click",function(){
		var $email = $registerWrap.eq(0).find('input').val();
		var $Rpsw = $registerWrap.eq(1).find('input').val();
		var $Rcpsw = $registerWrap.eq(2).find('input').val();
		var $Ryzm = $registerWrap.eq(3).find('input').val();
		// E-mail
		if($email.trim() == "" || !/^[\w\.\-]+@[a-zA-Z0-9\-]+(\.[a-zA-Z]+){1,2}$/.test($email)){
			$(".error_tip_e").text("请填写E-mail");
			check[0] = 0;
			return;
		}
		else{
			$.post("http://localhost/HD/php/register_check.php",{username:$email},function(data){
					var res = JSON.parse(data);
					if(res.msg == "fail"){
						$(".error_tip_e").text("该E-mail已被注册");
						check[0] = 0;
						return;
					}
					else{
						$(".error_tip_e").html("<img src='http://localhost/HD/img/register/keyizhuce.gif' />");
						check[0] = 1;
					}
				});
		}

		// 密码
		if($Rpsw.trim() == "" || $Rpsw.length < 8){
			$(".error_tip_p").text("密码长度不能小于8位");
			check[1] = 0;
			return;
		}
		else if(!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,24}$/.test($Rpsw)){
			$(".error_tip_p").text("密码必须为8-24位字母与数字组合");
			check[1] = 0;
			return;
		}
		else{
			$(".error_tip_p").html("<img src='http://localhost/HD/img/register/keyizhuce.gif' />");
			check[1] = 1;
		}

		// 确认密码
		if($Rcpsw.trim() == "" || $Rcpsw.length < 8){
			$(".error_tip_cp").text("密码长度不能小于8位");
			check[2] = 0;
			return;
		}
		else if($Rcpsw != $Rpsw){
			$(".error_tip_cp").text("两次输入的密码不一致");
			check[2] = 0;
			return;
		}
		else{
			$(".error_tip_cp").html("<img src='http://localhost/HD/img/register/keyizhuce.gif' />");
			check[2] = 1;
		}

		// 验证码
		if($Ryzm.trim() == "" || $Ryzm != resRandom){
			$(".error_tip_y").text("验证码不正确");
			check[3] = 0;
			return;
		}
		else{
			$(".error_tip_y").html("<img src='http://localhost/HD/img/register/keyizhuce.gif' />");
			check[3] = 1;
		}

		// 如果数据没有错误则把数据插入数据库
		if(check[0]==1 && check[1]==1 && check[2]==1 && check[3]==1){
			$.post("http://localhost/HD/php/register_insert.php",{username:$email,psw:$Rpsw},function(data){
				var res = JSON.parse(data);
				if(res.msg == "success"){
					document.cookie = "username=" + $email + ";path=/";
					document.cookie = "psw=" + $Rpsw + ";path=/";
					location.href = "http://localhost/HD/html/user.html";
				}
			});
		}	
	});

	// 给直接登录按钮点击事件
	$quickBtn.on("click",function(){
		location.href = "http://localhost/HD/html/login.html";
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