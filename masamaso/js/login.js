

$(function(){
	//登录时验证
	$(".login_form").on("submit",function() {
		var str1=$.cookie().email_UN||$.cookie().mobile_UN;
		var str2=$.cookie().epwd_inp2||$.cookie().mpwd_inp2;
		if ($(".account_inp").val()==str1&&$(".pwd").val()==str2) {
			window.location="../index.html?"+str1;
			$(".error").html("");
			$.cookie("account_inp",$(".account_inp").val(),{expires:7,path:"/"});
		}else if($(".account_inp").val()!=str1){
			$(".error").html("用户名不正确！");
		}else if($(".pwd").val()!=str2){
			$(".error").html("密码不正确！");
		}
		
		return false;
	})

	// 勾选 记住用户名
	$("#checkbox").click(function(event) {
		$.cookie("choice","checked",{expires:7});
	});
	
	jQuery(document).ready(function($) {		
		var Checked = $.cookie().choice;
		//用户是否勾选记住用户名  
		if(Checked=="checked"){
			//复选框选中
			var Checked =  $("#checkbox").prop("checked",true);
			console.log($.cookie().account_inp);
			//用户名进行赋值
			$(".account_inp").val($.cookie().account_inp);
		}

	});
})




$(function(){
	//给合作方登录添加背景图
	$(".other_login a").each(function(){
		var str="0 -"+(34*($(this).index()-1))+"px";
		$(this).find("span").css({"background":"url(../images/login_img/login_icon.png) no-repeat center","background-position":str})
	})
	//页面一加载登录框效果
	$(".login_content_wrap").stop().animate({"opacity":"1","filter":"alpha(opacity=100)"},"slow");
	$(".login_box").stop().animate({"margin-right":"30px","opacity":"0.9","filter":"alpha(opacity=90)"},"slow");

	
})

$(function(){
	//当用户登录时，在页面头部显示用户名等，点击退出跳到首页
	var str=$.cookie().account_inp;
	if(str){
		$("ul.head_top_right").html("<li>欢迎<a class='fontRed' href='##'>"+str+"</a>！</li><li><a href='##'>我的相关信息</a></li><li class='borR0'><a id='exit' href='javascript:;'>退出</a></li>");
		
		}
	$("#exit").click(function(){
		$.removeCookie("account_inp",{path:"/"});
		$("ul.head_top_right").html("<li><a href='login.html'>用户登录</a></li><li class='borR0'><a href='register.html'>新用户注册</a></li>");
	})
})




