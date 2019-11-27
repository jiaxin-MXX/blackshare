
//没有依赖
define(["jquery"], function($){
	//返回一个函数
	return function(){
		var arr=[];
		$.ajax({
			async:false,
			type: "get",
			url: "/api/index/propos", // 注意链接
			success: function(result) {
			arr.push(result);
				//console.log(arr[0])
			}
		});
		$.ajax({
			async:false,
			type: "get",
			url: "/api/index/ads", // 注意链接
			success: function(result) {
			arr.push(result);
			}
		});
		
		return arr;
	}
});

