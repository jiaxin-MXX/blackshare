require(["../scripts/config/config.js"], function(){
	require(["jquery","showdata",'gengxin'], function($,showdata,gengX){
		
        $(function(){
            var key=document.location.toString().split('?')[1].split('=')[1].replace('%3D','=')
            var data=showdata(key);
            var newData;
            console.log(data);
           
            //插入大图，小图，以及价格信息，特惠政策等
            function charu(){
                $('.pro-slogan').text(data[1].data.slogan);
                if(!data[2]){
                    $('#priceNow').text('￥'+(data[1].data.minprice));
                }else{
                    if(data[2].data[1]){
                        $('.act-name').text('【'+data[2].data[1].acname+'】');
                        $('.act-desc').text(data[2].data[1].slogan);
                    
                        $('#priceOld').text('￥'+data[1].data.minprice);
                        $('#priceNow').text('￥'+(data[1].data.minprice-JSON.parse(data[2].data[1].rules).cutPrice));
                    }
                    else{
                        $('#priceNow').text('￥'+data[1].data.minprice);
                    }
                }
                
                $('.Zimg').attr("src",data[0].data[0].url)
                console.log($('.Zimg').attr("src",data[0].data[0].url))
                $('.listbox ul').css('width',80*data[0].data.length+"px")
                if(data[0].data.length<=5){
                    $('.arrow').css("display","none")
                }
                $('.arrow-left').on('click',function(){
                    var index=$(".active").index();
                    //console.log(index)
                    if(index>4){
                        $('.listboxImg').css('margin-left',80*(index-5)+"px")
                    }
                    if($(".active").index()!=0){
                        $('.listboxImg li').eq(index-1).addClass('active');
                        $('.listboxImg li').eq(index).removeClass('active');
                    }
                    $('.big-img img').attr('src',$('.listboxImg li img').eq($('.active').index()).attr('src'))
                })
                $('.arrow-right').on('click',function(){
                    var index=$(".active").index()
                    if($(".active").index()!=data[0].data.length-1){
                        $('.listboxImg li').eq(index+1).addClass('active')
                        $('.listboxImg li').eq(index).removeClass('active');
                    }
                    //console.log($(".active").index())
                    if($(".active").index()>4){
                        console.log(1)
                        $('.listboxImg').css('margin-left',-80*($(".active").index()-4)+"px")
                    }
                    $('.big-img img').attr('src',$('.listboxImg li img').eq($('.active').index()).attr('src'))
                })
                
                for(var i=0;i<data[0].data.length;i++){
                    if(i==0){
                        $('.listboxImg').append(`<li class="active">
                        <img src="${data[0].data[i].url}">
                        </li>`)
                    }else{
                        $('.listboxImg').append(`<li>
                        <img src="${data[0].data[i].url}">
                        </li>`)
                    }
                    
                } 
                $('.listboxImg li').on('click',function(){
                    $(this).siblings().removeClass('active');
                    $(this).addClass('active');
                    $('.big-img img').attr('src',$('.listboxImg li img').eq($('.active').index()).attr('src'))
                })
    
                // if(data[2]&&data[2].data.length){
                
                $('.pro-price').after(`
                    <div class="act-col">
                        <div class="act-content">
                        
                        </div>
                    </div>
                `)
                if(data[2]&&data[2].data.length){
                    var str1=data[2].data[0].description.split('、')[0]+'(赠完即止)';
                    var str2=data[2].data[0].description.split('、')[1]+'(赠完即止)';
                    $('.act-content').append(`
                        <div class="act-list" style=""><div class="act-content-item"><div class="act-tag">${data[2].data[0].typeStr}</div><div class="act-title"><p>${str1}</p><p>${str2}</p></div></div><div class="act-content-item"><div class="act-tag">${data[2].data[1].typeStr}</div><div class="act-title">${data[2].data[1].description}</div></div>
                    `)
                }
                // }
                console.log(data[3],data[3].data.length)
                if(data[3]&&data[3].data.length){
                    $('.act-content').append(`
                    <div class="coupon-list" style="">
                        <div class="act-content-item">
                                <div class="act-tag">领券</div><div class="act-title"><span class="coupon">满${data[3].data[0].ordermountlimit}减${data[3].data[0].money}</span></div>
                            </div>
                        </div>
                    </div>
                    `)
                }
                for(var i=0;i<data[1].data.attributes.length;i++){
                    $('.attr').append(`
                        <div class="pro-choose-item">
                            <div class="pro-choose-name">${data[1].data.attributes[i].attrname}</div>
                            <div class="pro-choose-content">
                               
                            </div>
                        </div>
                    `)
                    for(var j=0;j<data[1].data.attributes[i].attrvals.length;j++){
                        if(j==0){
                            $('.pro-choose-content').eq(i).append(`
                                <div class="pro-choose-pill active animate-common animate-duration-ms" data-anid="${data[1].data.attributes[i].anid}" data-avid="${data[1].data.attributes[i].attrvals[j].avid}">${data[1].data.attributes[i].attrvals[j].avval}</div>
                            `)
                        }else{
                            $('.pro-choose-content').eq(i).append(`
                                <div class="pro-choose-pill animate-common animate-duration-ms" data-anid="${data[1].data.attributes[i].anid}" data-avid="${data[1].data.attributes[i].attrvals[j].avid}">${data[1].data.attributes[i].attrvals[j].avval}</div>
                            `)
                        }
                    }
                }
                $('.pro-choose-pill').on('click',function(){
                    $(this).siblings().removeClass('active')
                    $(this).addClass('active');
                    // $(this).parent().parent().index()
                    gengxin($(this).parent().parent().index());
                    change();
                })
            }
            charu()
            
            gengxin(2)
            change()
            ymhd()
            //页面的更新操作
            var p2;
            function gengxin(type){
                var str='';
                var sku=[];
                for(var i=0;i<data[1].data.attributes.length;i++){
                    str+=" "+$('.pro-choose-content').eq(i).children('.active').text();
                    $temp=$('.pro-choose-content').eq(i).children('.active')
                    sku[i]=$temp.attr('data-anid')+':'+$temp.attr('data-avid');
                }
                p2=str
                $('.pro-name').text(data[1].data.name+" "+str);
                var temp=sku.join(','),temp2;
                for(var i=0;i<data[1].data.skus.length;i++){
                    if(temp==data[1].data.skus[i].sku){
                        temp2=data[1].data.skus[i].skusn;
                        $('.big-img img').attr('src',data[1].data.skus[i].imgurl);
                        //'￥'+data[1].data.skus[i].shopprice
                        if(data[2]&&data[2].data.length){
                            $('#priceNow').text('￥'+(data[1].data.skus[i].shopprice-JSON.parse(data[2].data[1].rules).cutPrice))
                        }else{
                            $('#priceNow').text('￥'+data[1].data.skus[i].shopprice)
                        }
                        
                    }
                }
                newData=gengX(type,data[1].data.pid,temp2)
                for(var i=0;i<newData.length;i++){
                    //console.log(newData)
                    if(newData[i]){
                        data[i]=newData[i]
                    }   
                }
                
               
            }
            console.log(data)
            //改变下面的小图
            function change(){
                for(var i=0;i<data[0].data.length;i++)
                $('.listboxImg li img').eq(i).attr('src',data[0].data[i].url)
            }
            console.log(data)

            
            //购物车商品加减操作
            $('.reduce-num').on('click',function(){
                if(parseInt($('.sel-num .num').text())!=1){
                    $('.sel-num .num').text(parseInt($('.sel-num .num').text())-1)
                }
            })
            $('.add-num').on('click',function(){
                $('.sel-num .num').text(parseInt($('.sel-num .num').text())+1)
            })
            //监听大图的位置
           function ymhd(){
                if(data[2]&&data[2].data.length){
                    $('.img-list').css('top','20px')
                    $(document).scroll(function() {
                        var scroH = $(document).scrollTop();  //滚动高度
                            if(scroH >100){  //距离顶部大于100px时
                                $('.img-list').css({
                                    position: 'absolute',
                                    top: '100px'
                                })
                            }else{
                            $('.img-list').css({
                                position: 'fixed',
                                top: '50px'
                            })
                        }
                    });
                }
           }
           function getCookie(key){
            var a = document.cookie.split('; ');
            for(var i=0;i<a.length;i++){
                var b = a[i].split('=');
                if(b[0] == key){
                    return b[1];
                }
            }
        }
        //添加购物车商品
        $('#pay').on('click',function(){
            window.location.href='user.html'
        })
        var cmdate=data
        
        $('#cart').on('click',function(){
            if(!getCookie('nowid')){
                $('.flavr-overlay').css('position','fixed');
                $('.flavr-fixer').css({
                    display:'block',
                    transform:'rotateX(0deg) translate(-50%, -50%)'
                });
                $('.flavr-message').text('你还没有登录呢！')
            }else{
                console.log(cmdate)
                p2=p2.split(' ').join(',').slice(1)
                tempdata={
                    url:$('.big-img img').attr('src'),
                    p1:cmdate[1].data.name,
                    p2:p2,
                    count:$('.sel-num .num').text(),
                    price:parseInt($('#priceNow').text().slice(1)),
                    type:0
                }
                //console.log(tempdata)
                var arr=getCookie('user').split('^');
                //console.log(JSON.stringify(tempdata));
                //console.log(arr)
                for(var i=0;i<arr.length;i++){
                    var data=JSON.parse(arr[i])
                    if(data.id==getCookie('nowid')){
                        if(!data.message){
                            console.log(1)
                            var arrtemp=[];
                        }else{
                            var arrtemp=data.message.split('|||')
                        }
                        arrtemp.push(JSON.stringify(tempdata));
                        data.message=arrtemp.join('|||');
                        arr.splice(i,1,JSON.stringify(data))
                    }
                    
                }
               
                setCookie(arr,'7')
                $('.flavr-overlay').css('position','fixed');
                $('.flavr-fixer').css({
                    display:'block',
                    transform:'rotateX(0deg) translate(-50%, -50%)'
                });
                $('.flavr-message').text('已经加入亲亲的购物车哦！')
            }
            
        })

        $('.flavr-toolbar').on('click',function(){
            $('.flavr-overlay').css('position','');
            $('.flavr-fixer').css({
                display:'none',
                transform:'rotateX(90deg) translate(-50%, -50%)'
            });
        })
        $('.Zimg').attr("src",data[0].data[0].url)
        function setCookie(arr,time){
            var user='user'
            //console.log(arr)
            var date = new Date();
            date.setDate( date.getDate() + time );
            var data=arr.join('^')
            //console.log(data)
            document.cookie = user + '=' + data + '; expires=' + date;
        }
        })
    })
})