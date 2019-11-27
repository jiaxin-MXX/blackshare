define(["jquery"], function($){
	//返回一个函数
	return function(type,pid,skusn){
        var datamessage=[];
        //console.log(pid,skusn)
        if(type==1||type==2){
            $.ajax({
                url:'/api/pro/lbimg',
                type:'GET',
                data: {
                    pid: pid,
                    skusn: skusn
                },
                async:false,        //同步
                dataType:'json',    //返回数据的数据是什么格式的
                success(data){
                    datamessage[0]=data
                },            
            })
        }
        if(type==0||type==2){
            $.ajax({
                url:'/api/pro/baseinfo',
                type:'GET',
                data: {
                    pid: pid,
                    skusn: skusn
                },
                async:false,        //同步
                dataType:'json',    //返回数据的数据是什么格式的
                success(data){
                    datamessage[1]=data
                },            
            })
        }
        
        
        return datamessage
	}
});