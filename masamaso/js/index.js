$(function(){
	//当用户登录时，在页面头部显示用户名等，点击退出跳到首页
	var str=$.cookie().account_inp;
	if(str){
		$("ul.head_top_right").html("<li>欢迎<a class='fontRed' href='##'>"+str+"</a>！</li><li><a href='##'>我的相关信息</a></li><li class='borR0'><a id='exit' href='javascript:;'>退出</a></li>");
	}	
	$("#exit").click(function(){
		$.removeCookie("account_inp",{path:"/"});
		$("ul.head_top_right").html("<li><a href='html/login.html'>用户登录</a></li><li class='borR0'><a href='html/register.html'>新用户注册</a></li>");
	})
	
	console.log($.cookie().cart)
})
$(function() {
	// 大广告轮播 
  	var $banner_=$(".banner_box li")
  	var $btn_=$(".banner_btn li")
  	var index=0;
  	var timer=setInterval(currse,3000)
     function currse(){
	  	index++;
	  	$btn_.eq(index).children().addClass("red_border").parent().siblings().children().removeClass("red_border");
	  	$banner_.eq(index).stop().fadeIn().siblings().stop().fadeOut()
	  	if(index==2){
	  		index=-1;        
	  	}
  	};
  	$btn_.mouseenter(function(){
  	  clearInterval(timer)
  	   index=$(this).index()-1;
  	   currse()
  	}).mouseleave(function(){
  		timer=setInterval(currse,3000)
  	})
  	
  	
  	
  	//最新公告轮播
  	// jQuery(".notice").slide({mainCell:".notice_rbox",autoPlay:true,effect:"leftMarquee",vis:6,interTime:35});
  	// //使用superslide2插件，文字无缝滚动，鼠标放上去停止滚动，effect为效果，vis为可视个数，interTime为运行速度，maincell为切换元素的包裹层对象，autoplay为自动运行
  	// $(".notice_rbox a").css("width","auto");
 	 var speed=30;
    $(".notice_rbox p").eq(1).html($(".notice_rbox p").eq(0).html());
    function Marquee(){
        if($(".notice_right").scrollLeft()>=$(".notice_rbox p").width()){
            $(".notice_right").scrollLeft(0);
        }
        else{
            $(".notice_right").scrollLeft($(".notice_right").scrollLeft()+1);
        }
        // console.log( $(".notice_right").scrollLeft())
    }
    var MyMar=setInterval(Marquee,speed)
    $(".notice_right").mouseover(function() {
        clearInterval(MyMar);
    } )
    $(".notice_right").mouseout(function() {
        MyMar=setInterval(Marquee,speed);
    } )
    
    
    
    //时尚风标手风琴效果
    $(".fashion_box .text:even").css("backgroundColor","#f0f0f0");
    $(".fashion_box .text:odd").css("backgroundColor","#f9f9f9");
    $(".opened").css({"background":"url(images/index_img/fashion01.jpg) no-repeat center"});
    //$(".opened").find(".pic").css({ "left":"-140px","opacity": "0","filter": "alpha(opacity=0 )"});
    $(".opened").find(".pic").hide();
    var i=0;
    	$(".fashion_box").mouseenter(function(){
    		$(".fashion_box").eq(0).find(".pic").show();
    		//$(".fashion_box").eq(0).find(".pic").animate({ "left":"0px","opacity": "1","filter": "alpha(opacity=100 )"},"slow"); 
    		//$(this).stop().animate({"width":"780px"},"slow").siblings().stop().animate({"width":"140px"},"slow");  	
	    	$(this).addClass('opened').css("background","url(images/index_img/fashion0"+($(this).index()+1)+".jpg) no-repeat center").siblings().removeClass("opened");
	    	// $(this).find(".pic").hide();
	    	$(this).find(".pic").hide();
	    	//$(this).find(".pic").animate({ "left":"-140px","opacity": "0","filter": "alpha(opacity=0 )"},"slow").parent().siblings().find(".pic").show();
	    	$(this).find(".text").addClass('opacity_text');
	    }).mouseleave(function(){
	    	$(this).find(".pic").show();
	    	//$(this).find(".pic").animate({"left":"0px", "opacity": "1","filter": "alpha(opacity=100 )"},"slow");
	    	i=$(this).index(); 
	    	//console.log(i)   
	    })
    $(".fashion_accordion").mouseleave(function() {
    	//console.log(i)
    	$(".fashion_box").eq(i).find(".pic").hide();
    });
    
    
    
    
     // 时尚热销轮播效果
     $.get("js/hotProduct.json",function(data){
        var numPerpage=10;
        var totalNum=data[0].result.length;
        var pageNum=Math.ceil(totalNum/numPerpage);
        var obj=data[0].result;
        //console.log(obj)
        var str1="";
        for (var i =0; i < pageNum; i++) {
          str1+="<span>"+obj[(i*10+1)].sort_name+"</span>";
          $("<li></li>").appendTo(".hot_scroll ul");
          for (var j = 0; j < numPerpage; j++) {
				$("<dl><dt><a href='html/product_detail.html?"+obj[(i*10)+j].pid+"'><img src='images/index_img/"+obj[(i*10)+j].images_232x312_url+"' alt=''></a></dt><dd><p><a href='html/product_detail.html?"+obj[(i*10)+j].pid+"'>"+obj[(i*10)+j].hot_text+"</a></p><span>"+obj[(i*10)+j].hot_price+"</span></dd></dl>").appendTo($(".hot_scroll ul li").eq(i));
			}
          $(".hot_scroll ul li dl").eq((i*10)+4).css("margin","0");	
		  $(".hot_scroll ul li dl").eq((i*10)+9).css("margin","0");
        }
        $(".slider_nav").html(str1);
        $(".slider_nav span").eq(0).addClass("active_b_a");//给第一个角标默认样式
        var $ul = $(".hot_scroll ul");
		$(".hot_scroll li:first-child").clone().appendTo($(".hot_scroll ul"));//克隆第一个li添加在ul内部末尾
		var $li = $(".hot_scroll li");
		var len = $li.length;
		var perWidth = $li.outerWidth();
		$ul.css("width",perWidth*len);//定义ul的宽度
		$li.css("width",perWidth);//定义每个li的宽度
		var i = 0;
		var timer = setInterval(move,6000);
		function move(){
			i++;			
			if(i==len-1){//播放到最后一张图时，角标应该是第一个
				$(".slider_nav span").eq(0).addClass("active_b_a").siblings().removeClass("active_b_a");				
			}
			if(i == len){//最后一张图和第一张一样，走完最后一张就得跳到第二张
				i = 1;
				$(".hot_scroll ul").css("margin-left",0);	
			}			
			$ul.stop().animate({"margin-left":-perWidth*i});//用stop（）停止所有在指定元素上正在运行的动画。
			$(".slider_nav span").eq(i).addClass("active_b_a").siblings().removeClass("active_b_a");
		}
		$(".slider_nav span").on("mouseenter",function(){
			clearInterval(timer);
			i = $(this).index()-1;//因为move()里i++,i一进去就会自增1
			move()
		})
      })
     
     
     
     
     
     
     
     
     
     
    
})