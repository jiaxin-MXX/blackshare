require(["../scripts/config/config.js"], function(){
    require(["jquery","showdata",'gengxin'], function($){
        $(function(){
            $('#login-btn').on('click',function(){
                getmessage($('#mobile').val())
            })
            function getmessage(id){
                var count=0;
                var data=getCookie('user').split('^')
                console.log(getCookie('user').split('^'))
                for(var i=0;i<data.length;i++){
                    temp=JSON.parse(data[i])
                    if(temp.id==id){
                        count+=1;
                        if($('#passwd').val()==temp.password){
                            document.cookie = 'nowid='+id;
                            window.location.href='http://localhost:8000/pages/index.html'
                        }else{
                            $('.flavr-overlay').css('position','fixed');
                            $('.flavr-fixer').css({
                                display:'block',
                                transform:'rotateX(0deg) translate(-50%, -50%)'
                            });
                            $('.flavr-message').text('密码错误')
                        }
                    }
                    if(!count){
                        $('.flavr-overlay').css('position','fixed');
                        $('.flavr-fixer').css({
                            display:'block',
                            transform:'rotateX(0deg) translate(-50%, -50%)'
                        });
                        $('.flavr-message').text('查无此用户')
                    }
                }
            }
            $('.flavr-toolbar').on('click',function(){
                $('.flavr-overlay').css('position','');
                $('.flavr-fixer').css({
                    display:'none',
                    transform:'rotateX(90deg) translate(-50%, -50%)'
                });
            })
            //取用户信息
            function getCookie(key){
                var a = document.cookie.split('; ');
                for(var i=0;i<a.length;i++){
                    var b = a[i].split('=');
                    if(b[0] == key){
                        return b[1];
                    }
                }
            }
        })
    })
})