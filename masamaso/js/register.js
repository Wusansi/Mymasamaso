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
//邮箱注册
$(function(){
	
	$(".emai_form").on("submit",function(){		   
			var email_UN=$("#email_inp");
			var epwd_inp1=$(".epwd_inp1");
			var epwd_inp2=$(".epwd_inp2");
			if($("#email_inp").val()==""){
				email_UN.parent("p").siblings("span").html("请输入邮箱!");
			}
			else if($("#email_inp").val()!=""&&$("#email_inp").val()==$.cookie("email_UN")){
				$("#email_inp").parent("p").siblings("span").html("该邮箱已注册!")
			}
			else if($("#email_inp").val()!=$.cookie("email_UN")){
				isEmailNum(email_UN);				
				ispwd(epwd_inp1,epwd_inp2);
				isregister(email_UN);
				$.cookie("email_UN",email_UN.val(),{expires:7,path:"/"});	
				$.cookie("epwd_inp2",epwd_inp2.val(),{expires:7,path:"/"});			
				
			}
			
			return false;			
		});
		//手机号注册
		$(".mobi_form").on("submit",function(){		   
			var mobile_UN=$("#mobile_inp");
			var code_inp=$(".code_inp");
			var mpwd_inp1=$(".mpwd_inp1");
			var mpwd_inp2=$(".mpwd_inp2");
			if($("#mobile_inp").val()==""){
				mobile_UN.parent("p").siblings("span").html("请输入手机号!");
			}else if($("#mobile_inp").val()!=""&&$("#mobile_inp").val()==$.cookie("mobile_UN")){
				$("#mobile_inp").parent("p").siblings("span").html("该手机号已注册!")
			} 
			else if($("#mobile_inp").val()!=$.cookie("mobile_UN")){
				isPhoneNum(mobile_UN);
				iscode($(".code_inp"));
				ispwd(mpwd_inp1,mpwd_inp2);
				isregister(mobile_UN);
				$.cookie("mobile_UN",mobile_UN.val(),{expires:7,path:"/"});		
				$.cookie("mpwd_inp2",mpwd_inp2.val(),{expires:7,path:"/"});
				
			}
			return false;			
		});
		
		function isPhoneNum(obj){
			var re=/^1[3|4|5|7|8]\d{9}$/;
			
			//手机号码验证
			if (re.test(obj.val())) {
				obj.parent("p").siblings("span").html("")
			}else {
				obj.parent("p").siblings("span").html("请输入正确的手机号!");
			}
			
//			return false;
		}
		function isEmailNum(obj){
			var re= /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;			
			//邮箱验证
			if (re.test(obj.val())) {
				obj.parent("p").siblings("span").html("")				
			}else {
				obj.parent("p").siblings("span").html("请输入正确的邮箱!");
			}			
//			return false;
		}
		//验证码验证
		function iscode(obj){	
			
			if(obj.val()==$(".code_p b").html()){
				obj.siblings("span").html("");												
			}else{
				obj.siblings("span").html("验证码不正确！");	
			}
		}
		//密码验证
		function ispwd(obj1,obj2){
			var re=/^[a-zA-Z0-9]\w{8,20}$/g;
			if (re.test(obj1.val())&&obj1.val()!=""&&obj2.val()!=""&&obj2.val()==obj1.val()) {
				obj1.siblings("span").html("")
				obj2.siblings("span").html("");
//						if($(".checkbox_1").prop("checked","true")){
					
//						}
//						else{
//							return false;
//						}
//						window.location="login.html?"+obj1.val();
				}else if(obj2.val()!=obj1.val()){
					obj2.siblings("span").html("两次密码不一致!");
				}else{
					obj1.siblings("span").html("密码长度为9-20位，且只能是数字、大小写字母组合!");
				}
		}
		function isregister(obj){
			//注册成功弹窗
			$("#epopup_wrap").show();
			$("#epopup").show();
			setTimeout(function(){
				window.location="login.html?"+obj.val();
			},1000)
		}
})

)
//验证码
$(function(){
	function rand(min,max){
		return Math.floor(Math.random()*(max-min+1)+min);
	}
	var codeArr = 	['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
	var randCode = "";
	for(var i=0;i<4;i++){
		randCode+=codeArr[rand(0,61)];
	}
	
	$(".code_p b").html(randCode);
	$(".code_p a").click(function(){
		$(".code_p b").html(randCode);
	})

})


$(function(){
	//新用户注册信息方式选项卡
	$("h1.twoway p:first-child").addClass("e_m_active");
	
	$("h1.twoway p").click(function(){
		$(this).addClass("e_m_active").siblings("p").removeClass("e_m_active");
		$("div.way_box form").eq($(this).index()).show().parent("div").siblings("div").find("form").hide();
	})
	
	
})
















