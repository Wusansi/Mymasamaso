$(function(){
	$.get("../js/hotProduct.json",function(data){
//		var pid=window.location.search.replace(/\?/,"");
//		console.log($.cookie().cart);	
		console.log(localStorage.getItem("cart"));
//		var cookieObj = JSON.parse($.cookie("cart"));
		var cookieObj = JSON.parse(localStorage.getItem("cart"));
		var str1="";
		var str2="";
		var str3="";
		var pData=data[0].result;
		console.log(pData);
		$.each(pData, function(i) {
			$.each(cookieObj, function(key,value) {
				if (key==pData[i].pid) {
					str1+="<tr><td class='pid'><a href='product_detail.html?"+key+"'>"+key+"</a></td><td class='pro'><div class='poreat'><a class='proa' href='##'><img src='../images/shoppingCart_img/"+pData[i].images_92x81_url+"'/></a><div class='poreImg'><img src='../images/index_img/"+pData[i].images_232x312_url+"'/></div></div><p><a href='product_detail.html?"+key+"'><span>"+pData[i].hot_text+"</span></a></p></td><td>S</td><td>¥1699</td><td>¥<span class='perprice'>"+pData[i].hot_price+"</span></td><td><div class='addnum'><span class='button btn_cut_cart_product_num'><img src='../images/shoppingCart_img/btn_minus.gif'/></span><input type= readonly=readonly class='num' value='"+value+"'><span class='button btn_add_cart_product_num'><img src='../images/shoppingCart_img/btn_plus.gif' alt=''> </span></div></td><td class='pertotal'></td><td><a href='javascript:void(0);' class='delete btn_delete'>删除</a></td></tr>";
					str3+="<tr><td class='pay_pid'><a href='product_detail.html?"+key+"'>"+key+"</a></td><td class='pay_pro'><a href='javascript:;'><img src='../images/shoppingCart_img/"+pData[i].images_92x81_url+"'/></a><p><a href='product_detail.html?"+key+"'><span>"+pData[i].hot_text+"</span></a></p></td><td>S</td><td>¥<span class='perprice'>"+pData[i].hot_price+"</span></td><td class='pernum'>"+value+"</td><td class='pay_pertotal'></td></tr>";		
				}
			})
		});

		//如果购物车里没有加入商品
		function ifAdd(){
//			if($.cookie("cart")=="{}"){
			if(localStorage.getItem("cart")=="{}"){
	//			alert(0)
				$("#noAdd").show();
				$("#bcAdd_wrap").hide();
				$(".bc_footer").show();
			}else{
	//			alert(1)
				$("#noAdd").hide();
				$("#bcAdd_wrap").show();
				$(".bc_footer").show();
			}
		}
		ifAdd();
		$("#addGoods").html(str1);
		$("#pay_popup").find("tbody").html(str3);
		//初始状态，商品金额
		$(".pertotal").each(function(){
			$(this).html(parseInt($(this).siblings().children(".perprice").html())*parseInt($(this).siblings().find("input.num").val()));
		})
			
		
		
		//商品数量加减
		$(".btn_add_cart_product_num").each(function(){
			$(this).click(function(){
	//			alert(0)
				var i=$(this).siblings("input.num").val();
				i++;
				if(i>=10){
					$(this).siblings("input.num").val(10);
				}else{
					$(this).siblings("input.num").val(i);
				}
				var pertotal=parseInt($(this).parent().parent().siblings().find(".perprice").html())*parseInt($(this).siblings("input.num").val());
				$(this).parent().parent("td").siblings(".pertotal").html(pertotal);
				//商品数量加减时存cookie
				cookieObj[$(this).parent().parent("td").siblings(".pid").find("a").html()]=$(this).siblings("input.num").val();
				
				var objTostr = JSON.stringify(cookieObj);
//				$.cookie("cart",objTostr);
				localStorage.setItem("cart",objTostr);
//				console.log($.cookie().cart);
				console.log(localStorage.getItem("cart"));
				allPrice();
				popup_paynum();	
			})
		})
		$(".btn_cut_cart_product_num").each(function(){
			$(this).click(function(){
	//			alert(1)
				var i=$(this).siblings("input.num").val();
				i--;
				if(i<=1){
					$(this).siblings("input.num").val(1);
				}else{
					$(this).siblings("input.num").val(i);
				}
				var pertotal=parseInt($(this).parent().parent("td").siblings().find(".perprice").html())*parseInt($(this).siblings("input.num").val());
				$(this).parent().parent("td").siblings(".pertotal").html(pertotal);
				//商品数量加减时存cookie
				cookieObj[$(this).parent().parent("td").siblings(".pid").find("a").html()]=$(this).siblings("input.num").val();
				var objTostr = JSON.stringify(cookieObj);
//				$.cookie("cart",objTostr);
				localStorage.setItem("cart",objTostr);
//				console.log($.cookie().cart);
				console.log(localStorage.getItem("cart"));
				allPrice();
				popup_paynum();	
			})
		})
		
		
	//		console.log(parseInt($(".pertotal").html()));	
		//商品总金额
		function allPrice(){
			var allTotal=0;
			$(".pertotal").each(function(){			
				allTotal+=parseInt($(this).html());
			})
//			console.log(allTotal);
			str2="商品总金额：<em class='end'>"+allTotal+"</em>";
			$(".totalPrice").html(str2);
		}
		allPrice();
		
		
		//删除商品
		$(".btn_delete").each(function(){
			$(this).click(function(){
				delete cookieObj[$(this).parent().siblings(".pid").find("a").html()];
				$(this).parent().parent().remove();
				console.log(cookieObj);
				var objTostr = JSON.stringify(cookieObj);
//				$.cookie("cart",objTostr);
//				console.log($.cookie().cart);
				localStorage.setItem("cart",objTostr);
				console.log(localStorage.getItem("cart"));
				ifAdd();
				allPrice();
			})
		})

		cookieObj = JSON.parse($.cookie("cart"));
		//结算购买弹窗
		$("#pay_btn").click(function(){
			
			$("#pay_popupwrap").show();
			$("#pay_popup").show();	
			popup_paynum();						
		})
		$(".alipay_btn,.weixinpay_btn,.pay_cancel").click(function(){
			
			$("#pay_popup").hide();	
			$("#pay_popupwrap").hide();
		})
		function popup_paynum(){
			var pay_pertotal=0;
			var pay_alltotal=0;
			$.each(cookieObj, function(key,value) {
				$(".pay_pertotal").each(function(){
					
					if($(this).siblings(".pay_pid").find("a").html()==key){
						$(this).siblings(".pernum").html(value);
						
						pay_pertotal=parseInt(value)*parseInt($(this).siblings().find(".perprice").html());
						console.log(value);						
						$(this).html(pay_pertotal);
						console.log(pay_pertotal);
						pay_alltotal+=pay_pertotal;
						$(".pay_alltotal span").html(pay_alltotal)
					}
				})
			})	
		}
		
		
		//删除所有购物
		$("#btn_clear_cart_product_info").click(function(){
			
			$("#addGoods").find("tr").each(function(){
				delete cookieObj[$(this).find(".pid").find("a").html()];
//				$(this).remove();
				console.log(cookieObj);
				var objTostr = JSON.stringify(cookieObj);
//				$.cookie("cart",objTostr);
//				console.log($.cookie().cart);
				localStorage.setItem("cart",objTostr);
				console.log(localStorage.getItem("cart"));
				ifAdd();
			})
			$("#addGoods").find("tr").remove();
//			console.log($.cookie("cart"))
			console.log(localStorage.getItem("cart"))
		})
		//订单换购的收展功能
		$(".close_btn").click(function(){
			$(".orderchange img").toggle();
		})
		//鼠标滑过小图显示大图
		$(".proa").each(function(){
			$(this).on("mouseenter mouseleave",function(){
				$(this).siblings(".poreImg").toggle();
			})
		})
	})
})
