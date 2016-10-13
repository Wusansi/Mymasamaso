//商品详情页面
$(function(){
	$.get("../js/hotProduct.json",function(data){
		var pid=window.location.search.replace(/\?/,"");
		var str1="";
		var str2="";
		var str3="";
		var str4="";
		var str5="";
		var data=data[0].result;
		console.log(data);
		for(var i=0;i<data.length;i++){
			if (pid==data[i].pid) {
				str1="<a href='../index.html'>首页</a> &gt;<a class='ch_1' href='##'>"+data[i].sort_name+"</a> &gt;<span class='ch_3'>"+data[i].hot_text+"</span> ";
				str2="<li><a class='zoomThumbActive' href='##'><img src='../images/product_detail_img/"+data[i].zoomImagesMin_1_72x91_url+"'/></a></li><li><a href='##'><img src='../images/product_detail_img/"+data[i].zoomImagesMin_2_72x91_url+"'/></a></li><li><a href='##'><img src='../images/product_detail_img/"+data[i].zoomImagesMin_3_72x91_url+"'/></a></li><li><a href='##'><img src='../images/product_detail_img/"+data[i].zoomImagesMin_4_72x91_url+"'/></a></li><li><a href='##'><img src='../images/product_detail_img/"+data[i].zoomImagesMin_5_72x91_url+"'/></a></li><li><a href='##'><img src='../images/product_detail_img/"+data[i].zoomImagesMin_6_72x91_url+"'/></a></li>";
				str3="<img  src='../images/product_detail_img/"+data[i].zoomImagesMed_1_474x599_url+"'/><div class='zoomPup'>";
				str4="<img class='bigImg' src='../images/product_detail_img/"+data[i].zoomImagesBig_1_1200x1516_url+"'/>/div>";
				str5=" <div class='left'><span class='yuan left'>特价：</span><strong class='price24 left'>"+data[i].hot_price+"</strong><div class='org_price_flag right'><span>吊牌价:￥1799.00</span></div></div><p class='goods_artNo right'>商品款号：20294</p><div class='leaguer_price clearfix'><div class='left'></div></div>";
			}
		}
		$(".info_nav").html(str1);
		$("#thumblist").html(str2);
		$(".smallBox").html(str3);
		$(".zoomWindow").html(str4);
		$("#goods_ri_p2").html(str5);
		
		
		//商品数量加减
		$(".btn_add_cart_product_num").click(function(){
//			alert(0)
			var i=$("#product_num").val();
			i++;
			if(i>=10){
				$("#product_num").val(10);
			}else{
				$("#product_num").val(i);
			}
		})
		$(".btn_cut_cart_product_num").click(function(){
//			alert(1)
			var i=$("#product_num").val();
			i--;
			if(i<=1){
				$("#product_num").val(1);
			}else{
				$("#product_num").val(i);
			}
		})
		

		//加入购物车
		if($.cookie("cart")){
			var obj = JSON.parse($.cookie("cart"))
		}else{
			var obj = {};
		}
		//var obj = {};
		
		var num = obj[pid]||0;
		$("#submit_btn2").click(function(){
			num+=$("#product_num").val()-1;
			obj[pid] = ++num;
			var objTostr = JSON.stringify(obj);
			$.cookie("cart",objTostr);
			var cookieObj = JSON.parse($.cookie("cart"));
			console.log(cookieObj);
			window.location="shoppingcart.html";
		})
		           	
		//商品图片放大镜
		$("#thumblist a").click(function(){
			$(this).addClass("zoomThumbActive").parent("li").siblings("li").children("a").removeClass();
			var str1=$(this).find("img").attr("src").replace("nde","ndm");
			var str2=$(this).find("img").attr("src").replace("nde","ndb");
	//		console.log(str);
			$(".smallBox img").attr({"src":str1});
			$(".zoomWindow img").attr({"src":str2})
		})
		//$(".smallBox");  小盒子
		 //$(".zoomPup"); 放大镜
		//$(".zoomWindow");  大盒子
		//$(".bigImg");  大图片	
		//当鼠标浮动到小盒子上时，显示出放大镜（tool）,显示出右边的大盒子。
		//在小盒子上移动鼠标时，放大镜（tool）跟着鼠标移动（范围就是小盒子内）。右边的大盒子中的大图片也随之移动
		//offsetWidth  offsetHeight   获取一个节点对象的宽度和高度（不包括滚动条）
		$(".smallBox").mouseenter(function(){
			$(".zoomPup").show();
			$(".zoomWindow").show();
		})
		$(".smallBox").mousemove(function(e){
			var shotLeft = e.pageX - $(this).offset().left - $(".zoomPup").outerWidth()/2;
			var shotTop = e.pageY - $(this).offset().top - $(".zoomPup").outerHeight()/2;
			
			if(shotLeft <= 0){
				shotLeft = 0;
			}
			if(shotLeft >= $(this).outerWidth()-$(".zoomPup").outerWidth()){
				shotLeft = $(this).outerWidth()-$(".zoomPup").outerWidth();
			}
			if(shotTop<=0){
				shotTop = 0;
			}
			if(shotTop >= $(this).outerHeight()-$(".zoomPup").outerHeight()){
				shotTop = $(this).outerHeight()-$(".zoomPup").outerHeight();
			}
			$(".zoomPup").css({
				"left":shotLeft,
				"top":shotTop
			})
			
			var percentX = shotLeft/($(this).outerWidth()-$(".zoomPup").outerWidth());
			var percentY = shotTop/($(this).outerHeight()-$(".zoomPup").outerHeight());
			
			var imgLeft = percentX*($(".zoomWindow").outerWidth()-$(".zoomWindow img").outerWidth());
			var imgTop = percentY*($(".zoomWindow").outerHeight()-$(".zoomWindow img").outerHeight());
	//		console.log(imgLeft,imgTop);
			$(".zoomWindow img").css({
				"left":imgLeft,
				"top":imgTop
			});
		
		})
		
		$(".smallBox").mouseleave(function(){
			$(".zoomPup").hide();
			$(".zoomWindow").hide();
		})
		
		
		
		
		
		
	})
})

$(function(){
	//跟随滚动条滚动导航的微信二维码
	$(".goods_wx").click(function(){
		$(".goods_wx").toggleClass("goods_wx1");
		$(".goods_wx_ico").toggleClass("goods_wx_ico2");
		$(".goods_wx_img").toggle();
	});     
})



	//跟随滚动条滚动导航
$(window).scroll(function(){
	 	//scroll 事件适用于所有可滚动的元素和 window 对象（浏览器窗口）。
	 	var scrollTopValue = $(document).scrollTop();
	 	//获取文档向上滚动的距离
	 	//console.log(scrollTopValue)
	 	var topHeight = $(".head_top").outerHeight()+$(".head_search").outerHeight()+$(".head_logo").outerHeight()+$(".Phead_nav1_wrap").outerHeight()+$(".head_nav2_wrap").outerHeight()+$(".buy_detail").outerHeight()+$(".goods_looked_part").outerHeight();
	 	//获取top的高度
	 	if (scrollTopValue >= topHeight) {
	 		$(".content_scroll").css({
	 			"position":"fixed",
	 			"top":0,
	 			"z-index":50
	 		}).show();
	 		
	 	}else{
	 		$(".content_scroll").css({
	 			"position":"static"
	 			  //static 默认值。没有定位，元素出现在正常的流中（忽略 top, bottom, left, right 或者 z-index 声明）
	 		}).hide();
	 	}
	 	
	 	
	 })








