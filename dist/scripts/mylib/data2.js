
//按照规范要求，模块需要使用define函数定义
//定义模块时，依然可以声明依赖
define(["jquery"], function($){
	return function(){
		var data
		$.ajax({
			type: "get",
			url: "/index/ads", // 注意链接
			success: function(result) {
				data=result;
				//console.log(arr[0])
			}
		});
		return data
	}
});
