
require(["../scripts/config/config.js"], function(){
    require(["jquery"], function($){
        $(function(){
            //console.log(getCookie('nowid'))
            var arr=getCookie('user').split('^');
            //console.log(arr);
            var data;
            //商品信息更新操作
            if(juge()==1){
                console.log(1)
                gengXIN()
            }else{
                console.log(2)
                $('#cartFull').css('display','none');
                $('#cartEmpty').css('display','block')
            }
            function gengXIN(){
                $('tbody').html('')
                for(var i=0;i<arr.length;i++){
                    data=JSON.parse(arr[i])
                    if(data.id==getCookie('nowid')){
                       // console.log(data.message.split('|||').length)
    
                        for(var j=0;j<data.message.split('|||').length;j++){
                            var temp=JSON.parse(data.message.split('|||')[j])
                            console.log(temp)
                            if(temp.type==0){
                                $('tbody').append(`
                                <tr><td class="t-l" width="188"><input type="checkbox" id="select-0" value="1" checked="" name="sex" data-skusn="K19091229835_2" data-count="1" data-price="3999" style="display: none;"><label for="select-0" class="checkboxCol active"><div class="icon-select-col"><i class="icon-select animate-common dontno" index="1"></i></div><span></span></label></td><td width="70"><div class="img-col"><img src="${temp.url}"></div></td><td width="246"><p class="pro-name">${temp.p1}</p><p class="pro-desc">${temp.p2}</p></td><td width="134"><div class="sel-num"><button class="reduce-num" id="reduce0">-</button><i class="num">${temp.count}</i><button class="add-num" id="add0">+</button></div></td><td class="typeok" width="134">￥${temp.price}<td width="134">待付款</td><td width="134"><i class="fa fa-trash-o">X</i></td></tr>
                            `)
                            }
                        }
                    }
    
                }
            }   
            allP();
            //商品的加减操作
            $('.reduce-num').on('click',function(){
                if(parseInt($(this).next('.num').text())!=1){
                    $(this).next('.num').text(parseInt($(this).next('.num').text())-1)
                    allP()
                }
            })
            $('.add-num').on('click',function(){
                //console.log(parseInt($(this).prev().text()))
                $(this).prev().text(parseInt($(this).prev().text())+1);
                allP();
            })
            //一键全选
            $('.icon-select-col').eq(0).on('click',function(){
                //console.log($('.icon-select').eq(0).attr('index'))
                if($('.icon-select').eq(0).attr('index')=="1"){
                    $('.icon-select').attr('index','0').css('opacity','0')
                }else{
                    $('.icon-select').attr('index','1').css('opacity','1')
                }
                
            })

            //删除商品操作：
            $('.fa-trash-o').on('click',function(){
                //处理cookie
                var arr=getCookie('user').split('^');
                for(var i=0;i<arr.length;i++){
                    var data=JSON.parse(arr[i])
                    if(data.id==getCookie('nowid')){
                        var arrtemp=data.message.split('|||')
                        arrtemp.splice($(this).parents('tr').index(),1)
                        // arrtemp.push(JSON.stringify(tempdata));
                        data.message=arrtemp.join('|||');
                        arr.splice(i,1,JSON.stringify(data))
                        
                    }
                    
                }
                setCookie(arr,'7')
                //arr.splice($(this).parents('tr').index(),1)
                //移除节点
                $(this).parents('tr').remove()
                allP();
            })

            //改变总价钱
            function allP(){
                $('#count-all').text($('.dontno').length)
                var mml=0
                var mmp=0
                for(var i=0;i<$('.dontno').length;i++){
                    if($('.dontno').eq(i).attr('index')=="1"){
                        mml++;
                        mmp+=parseInt($('.typeok').eq(i).text().slice(1))*parseInt($('.sel-num .num').eq(i).text())
                    }
                }
                $('#count-select').text(mml)
                $('.total-price').text('￥'+mmp)
            }
            //全选，单选
           
            for(var i=0;i<$('.dontno').length;i++){
                $('.dontno').eq(i).on('click',function(){
                    
                    if($(this).attr('index')=='1'){
                        $(this).attr('index','0').css('opacity','0')
                    }else{
                        $(this).attr('index','1').css('opacity','1')
                    }
                    var shuliang=0
                    for(var i=0;i<$('.dontno').length;i++){
                        if($('.dontno').eq(i).attr('index')=="1"){
                            shuliang++;
                        }     
                    }
                    //console.log(shuliang)
                    if(shuliang==$('.dontno').length){
                        $('.icon-select').eq(0).attr('index','1').css('opacity','1')
                    }else{
                        $('.icon-select').eq(0).attr('index','0').css('opacity','0')
                    }
                    allP()
                })
                
            }
            function type(){
                var typearr=[]
                for(var i=0;i<$('.dontno').length;i++){
                    typearr.push($('.dontno').eq(i).attr('index'))
                }
                return typearr
            }
            //确认支付
            $('#pay').on('click',function(){
                $('.flavr-overlay').css('position','fixed');
                $('.flavr-fixer').css({
                    display:'block',
                    transform:'rotateX(0deg) translate(-50%, -50%)'
                });
                $('.flavr-message').text('用户'+getCookie('nowid')+'一共消费'+$('.total-price').text().slice(1)+'元！')
                //商品状态改变为1
                var typenow=type();
                console.log(typenow)
                var arr=getCookie('user').split('^');
                for(var i=0;i<arr.length;i++){
                    var data=JSON.parse(arr[i])
                    if(data.id==getCookie('nowid')){
                        var arrtemp=data.message.split('|||')
                        var arrtemp2=[]
                        // console.log(arrtemp.length-1)
                        for(var j=0;j<typenow.length;j++){
                            var datatype=JSON.parse(arrtemp[arrtemp.length-1-j]);
                            datatype.type=typenow[typenow.length-1-j];
                            //console.log(datatype)
                            //arrtemp.splice(arrtemp.length-1-j,1,JSON.stringify(datatype))
                            arrtemp2.push(JSON.stringify(datatype));

                            console.log(arrtemp)
                        }
                        arrtemp=arrtemp2;
                        //arrtemp.push(JSON.stringify(tempdata));
                        data.message=arrtemp.join('|||');
                        arr.splice(i,1,JSON.stringify(data))
                        // console.log(arrtemp)
                    }
                }
                setCookie(arr,'7')
            })
            $('.flavr-toolbar').on('click',function(){
                $('.flavr-overlay').css('position','');
                $('.flavr-fixer').css({
                    display:'none',
                    transform:'rotateX(90deg) translate(-50%, -50%)'
                });

                if(juge()==1){
                    console.log(1)
                    window.location.href='user.html'
                }else{
                    $('#cartFull').css('display','none');
                    $('#cartEmpty').css('display','block')
                }
            })
            function juge(){
                var data1=getCookie('user').split('^')
                //console.log(data1)
                for(var i=0;i<arr.length;i++){
                    var data2=JSON.parse(arr[i])
                    var jugeCount=0
                    if(data2.id==getCookie('nowid')){
                        if(!data2.message){
                            console.log(1.1)
                            return 0;
                        }else{
                            for(var j=0;j<data2.message.split('|||').length;j++){
                                var temp=JSON.parse(data2.message.split('|||')[j])
                                console.log(temp)
                                if(temp.type==1){
                                    jugeCount++;
                                }
                            }
                            if(jugeCount<data2.message.split('|||').length){
                                console.log(1.2)
                                return 1;
                            }else{
                                console.log(1.3)
                                return 0;
                            }
                        }   
                    }
                }
            }
            //去商城
            $('#goStore').on('click',function(){
                window.location.href='index.html'
            })
            //cookie操作
            function getCookie(key){
                var a = document.cookie.split('; ');
                for(var i=0;i<a.length;i++){
                    var b = a[i].split('=');
                    if(b[0] == key){
                        return b[1];
                    }
                }
            }
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