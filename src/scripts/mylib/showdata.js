define(["jquery"], function($){
	//返回一个函数
	return function(key){
        var datamessage=[];
        console.log(key)
        $.ajax({
            url:'/api/pro/lbimg?pid=&'+key,
            type:'GET',
            async:false,        //同步
            dataType:'json',    //返回数据的数据是什么格式的
            success(data){
                datamessage[0]=data
            },
            error(err){
                console.log(err)
            }                
        })
        $.ajax({
            url:'/api/pro/baseinfo?pid=&'+key,
            type:'GET',
            // data: {
            //     pid: 95,
            //     skusn: 'k19052943694_1'
            // },
            async:false,        //同步
            dataType:'json',    //返回数据的数据是什么格式的
            success(data){
                datamessage[1]=data
            },
            error(err){
                console.log(err)
            }                
        })
        $.ajax({
            url:'/api/pro/coupon?pid=&'+key,
            type:'GET',
            async:false,        //同步
            dataType:'json',    //返回数据的数据是什么格式的
            success(data){
                if(data.data.length!=0){
                    cb();
                }
                datamessage[3]=data
            },
            error(err){
                console.log(err)
            }                
        })
        function cb(){
            $.ajax({
                url:'/api/pro/act?'+key,
                type:'GET',
                async:false,        //同步
                dataType:'json',    //返回数据的数据是什么格式的
                success(data){
                    datamessage[2]=data
                }             
            })
        }
		return datamessage
	}
});
