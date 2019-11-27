//做配置（配置每一个模块的加载路径）
requirejs({
	baseUrl: "http://localhost:8000/",
	paths : {
		"jquery" : "scripts/scripts/jquery-2.0.3",
		"swiper" : "scripts/scripts/swiper",
		"jq.ui" : "scripts/scripts/jquery-ui",
		"data" : "scripts/mylib/data",
		"mb" : "scripts/mylib/mb",
		"showdata" : "scripts/mylib/showdata",
		"gengxin" : "scripts/mylib/gengxin",
		"add" : "scripts/mylib/add",
		"css" : "scripts/scripts/css"
	},
	shim : {
		"swiper" : {
			deps : ["css!static/staticCss/swiper.css"]
		}
	}
})
