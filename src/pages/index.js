require(["../scripts/config/config.js"], function(){
	require(["jquery","data","swiper","add"], function($,Data,swiper,add){
		
		$(function(){
			Data();
			add();
			var data=window.globalConfig.data;
			new swiper ('.swiper-container', {
				initialSlide :0,
				direction : 'horizontal',
				loop:true,
				autoplay: {
					delay: 3000,
					stopOnLastSlide: false,
					disableOnInteraction: false,
				},
				paginationClickable: true,
				pagination: {
					el: '.swiper-pagination',
					clickable: true,
				},
			});
			//console.log(data)
			
			for(var i=0;i<5;i++){
				$('.bannerImg').eq(i+1).attr("src",data[1].data[i].showimg)
			}
			$('.bannerA').eq(5).attr("href",data[1].data[4].jumpurl);

			$('.pro-ul li a').on("click",function(){
				$('.form').val($(this).attr('data-url').split('?')[1])
				document.redictForm.submit();
			})

			$('.pro-span').on('click',function(ev){
				if($(this).next('ul').attr("onoff")=="off"){
					$(this).next('ul').css("height","100%").attr("onoff","on");
					$(this).html('收起<img class="jiao" src="https://shop-1256119282.file.myqcloud.com/blackshark/pc-source/resource/img/index/prolist/right.png" alt="">')
					$(this).children('img').css("transform","rotate(90deg)");
				}
				else{
					$(this).next('ul').css("height","336px").attr("onoff","off");
					$(this).html('更多<img class="jiao" src="https://shop-1256119282.file.myqcloud.com/blackshark/pc-source/resource/img/index/prolist/right.png" alt="">')
				}
					
			})
			$('.user').on('click',function(){
				window.location.href='http://localhost:8000/pages/user.html'
			})
		})
		
	})
})

























