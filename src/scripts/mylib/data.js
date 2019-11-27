define(["jquery","mb"], function($,mb){
	//返回一个函数
	return function(){
        var arr=mb();
		window.globalConfig = {
			data:arr,
		}
	}
});