require(["../scripts/config/config.js"], function(){
    require(["jquery"], function($){
        $(function(){
            $('.icon-select-col').on('click',function(){
                $('.icon-select').toggleClass('show hide').toggle()
            })
            $('.btn-col').on('click',function(){
                if(!$('.form-control').val()){
                    $('.flavr-overlay').css('position','fixed');
                    $('.flavr-fixer').css({
                        display:'block',
                        transform:'rotateX(0deg) translate(-50%, -50%)'
                    });
                    $('.flavr-message').text('请输入用户名')
                }else if($('#passwd').val()!=$('#passwdAgain').val()){
                    $('.flavr-overlay').css('position','fixed');
                    $('.flavr-fixer').css({
                        display:'block',
                        transform:'rotateX(0deg) translate(-50%, -50%)'
                    });
                    $('.flavr-message').text('两次密码不一样哦')
                }else if(judge()){
                    $('.flavr-overlay').css('position','fixed');
                    $('.flavr-fixer').css({
                        display:'block',
                        transform:'rotateX(0deg) translate(-50%, -50%)'
                    });
                    $('.flavr-message').text('已存在该用户')
                }else{
                    setCookie($('#mobile').val(),$('#passwd').val(),7);
                    $('.flavr-overlay').css('position','fixed');
                    $('.flavr-fixer').css({
                        display:'block',
                        transform:'rotateX(0deg) translate(-50%, -50%)'
                    });
                    $('.flavr-message').text('注册成功')
                }
            })
            function judge(){
                var data=getCookie('user').split('^');
                for(var i=0;i<data.length;i++){
                    var temp=JSON.parse(data[i]);
                    if(temp.id==$('.form-control').val()){
                        return 1;
                    }
                }
                return 0
            }

            $('.flavr-toolbar').on('click',function(){
                $('.flavr-overlay').css('position','');
                $('.flavr-fixer').css({
                    display:'none',
                    transform:'rotateX(90deg) translate(-50%, -50%)'
                });
                if($('.flavr-message').text()=='注册成功'){
                    window.location.href='http://localhost:8000/pages/login.html'
                }
            })
            //设置cookie
            function setCookie(id,password,time ){
                var user='user'
                var arr=[];
                if(getCookie(user)){
                    // console.log(typeof(getCookie(user)))
                    console.log(getCookie(user))
                    arr=getCookie(user).split('^')
                }
                var date = new Date();
                date.setDate( date.getDate() + time );
                temp={
                    id:id,
                    password:password
                }
                temp=JSON.stringify(temp)
                arr[arr.length]=temp;
                var data=arr.join('^')
                document.cookie = user + '=' + data + '; expires=' + date;
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
        })
    })
})