define(["jquery","data",], function($,Data){
    //返回一个函数
   
	return function(){
		//var data=mb();
		var data=window.globalConfig.data;
		console.log(window.globalConfig.data)
		var len=0;
			for(var i=0;i<data[0].data.length;i++){
				$child=`
				<div class="content-center-md">
				<p>${data[0].data[i].posname}</p>
				<span class="pro-span">更多
				<img class="jiao" src="https://shop-1256119282.file.myqcloud.com/blackshark/pc-source/resource/img/index/prolist/right.png" alt="">
				</span>
				<ul onoff="off" class="pro-ul">
				</ul>
				</div>
				`
				$('.pro-list').append($child);
				for(var j=0;j<data[0].data[i].poslist.length;j++){
					$('.pro-ul').eq(i).append(`<li><a data-url="${data[0].data[i].poslist[j].jumpurl}">
						
						<div class="proImg">
							<img src="${data[0].data[i].poslist[j].img}" alt="">
						</div>
						<p class="pro-name">${data[0].data[i].poslist[j].name}</p>
						<p class="pro-desc">${data[0].data[i].poslist[j].slogan}</p>
						<p class="pro-price">￥${data[0].data[i].poslist[j].price}</p>
					</a></li>`)
					
					if(data[0].data[i].poslist[j].tag==1){
						$('.proImg').eq(len+j).append('<h6>新品</h6>')
					}
				}
				len+=data[0].data[i].poslist.length;
				
			}
			
	}
});