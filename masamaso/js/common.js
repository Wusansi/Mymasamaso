

$(function(){
	// 顶部导航二鼠标滑过效果和顶部导航二划过出现下拉菜单效果
	$(".head_nav2").mouseover(function(){
		$(".head_nav2_wrap").css("background-color","#1e1e1e");
		$(".head_nav2_black").find('a').css("color","#fff");
		$(".head_nav2_black").find('i').css({"background-position":"0 -10px"});
		$("#slideUp").stop().slideDown();
	}).mouseout(function(){
		$(".head_nav2_wrap").css("background-color","#fff");
		$(".head_nav2_black").find('a').css("color","#666");
		$(".head_nav2_black").find('i').css({"background-position":"0 0"});
		$("#slideUp").stop().slideUp();
	})
	$("#slideUp li").on("mouseover mouseout",function(){
		$(this).toggleClass('slideUp_active');
		$(this).parent().parent().prev(".head_nav2_black").find(".head_nav2_left a").eq($(this).index()).toggleClass('nav2_a_active');
	});
	$(".head_nav2_left a").on("mouseover mouseout",function(event) {
		$(this).toggleClass('nav2_a_active');
	});
	//主题活动篇，经典专区，国庆节满399送199礼包鼠标划入广告图变大，标题块变红
     $(".activity_theme li,.classics_part li,.foot_banner").mouseenter(function(){
     	$(this).find("div").addClass("active_div");
     	$(this).find("a").stop().animate({"width":"110%"},"slow");
     }).mouseleave(function(){
     	$(this).find("div").removeClass("active_div");
     	$(this).find("a").stop().animate({"width":"100%"},"slow");
     })
	 //侧边栏鼠标划入显示效果
     $(".side_column li").mouseenter(function(){
     	$(this).css({"background":"#990000"});
     	$(this).find("div").show().stop().animate({"left":"-164px"},"slow");
     }).mouseleave(function(){
     	$(this).css({"background":"#1e1e1e"});
     	$(this).find("div").stop().animate({"left":"-190px"},"slow").hide();
     })
     //返回顶部
     $(".side_top").click(function(){
     	$(window).scrollTop(0);
     })
})
//顶部导航条跟随滚动条滚动
$(window).scroll(function(){
	 	//scroll 事件适用于所有可滚动的元素和 window 对象（浏览器窗口）。
	 	var scrollTopValue = $(document).scrollTop();
	 	//获取文档向上滚动的距离
	 	//console.log(scrollTopValue)
	 	var topHeight = $(".head_top").outerHeight()+$(".head_search").outerHeight()+$(".head_logo").outerHeight();
	 	//获取top的高度
	 	if (scrollTopValue >= topHeight) {
	 		$(".head_nav1_wrap").css({
	 			"position":"fixed",
	 			"top":0,
	 			"z-index":50
	 		}).addClass("head_nav1_wactive").find("a").addClass("nav1a_active");
	 		
	 	}else{
	 		$(".head_nav1_wrap").css({
	 			"position":"static"
	 			  //static 默认值。没有定位，元素出现在正常的流中（忽略 top, bottom, left, right 或者 z-index 声明）
	 		}).removeClass("head_nav1_wactive").find("a").removeClass("nav1a_active");
	 	}
	 	
	 	
	 })

//联想词搜索框
window.onload = function() {
	var oTxt = document.getElementById('searchText');
	oTxt.onkeyup = function() {
		var val = this.value;
		var oScript = document.createElement('script');
	
		oScript.src = "https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=" + val + "&cb=hhl"
			document.body.appendChild(oScript);
			document.body.removeChild(oScript);
		}
};
	
function hhl(data) {
		//alert(data.s[0])
	var oList = document.getElementById('list');
	var html = ''
	if (data.s.length > 0) {
		for (var i = 0; i < data.s.length; i++) {
			html += '<li><a href="https://www.baidu.com/s?wd=' + data.s[i] + '" target="_blank">' + data.s[i] + '</a></li>'
		}
		oList.style.display = 'block';
		oList.innerHTML = html;
	
	}else{
		oList.style.display = 'none';
		}
}
////
//$(function(){
//	console.log($.cookie().cart);
//})
