const gulp = require("gulp");

const babel = require("gulp-babel");
const uglify = require("gulp-uglify");

const webserver = require("gulp-webserver");

const sass = require("gulp-sass");


gulp.task("server", ["build"], ()=>{
	gulp.src("./dist")
		.pipe( webserver({
			livereload : true,
			// port: 8888
			proxies:[{
				source:"/api",
				target:"http://store.blackshark.com"
			}]
		}) )
		
	gulp.watch("./src/**/*.js", ["compileJS"]);
	gulp.watch("./src/**/*.html", ["compileHTML"]);
	gulp.watch("./src/**/*.scss", ["compileCSS"]);
})

gulp.task("build", ()=>{
	
	// base参数， 可以指定读取文件的根路径，生成文件时，会保留src后的所有路径
	gulp.src("./src/scripts/**/*.js", {
		base: "./src"
	}).pipe( gulp.dest("./dist") );
	
	gulp.src("./src/pages/**/*.js", {
		base: "./src"
	}).pipe( gulp.dest("./dist") );
	
	gulp.src("./src/pages/**/*.html", {
		base: "./src"
	}).pipe( gulp.dest("./dist") );
	
	gulp.src("./src/styles/**/*.scss", {
		base: "./src"
	}).pipe(sass({
		outputStyle : "expanded"  //设定生成代码风格
	}).on('error', sass.logError))
	.pipe( gulp.dest("./dist") );
		
	gulp.src("./src/static/**/*.*", {
		base: "./src"
	}).pipe( gulp.dest("./dist") )
})


gulp.task("compileJS", ()=>{
	gulp.src("./src/**/*.js")
		// .pipe(babel({
		// 	presets: ["@babel/env"]
		// }))
		// .pipe( uglify() )
		.pipe( gulp.dest("./dist") )
})

gulp.task("compileHTML", ()=>{
	gulp.src("./src/**/*.html")
		.pipe( gulp.dest("./dist") )
})

gulp.task("compileCSS", ()=>{
	gulp.src("./src/**/*.scss")
		.pipe(sass({
			outputStyle : "expanded"  //设定生成代码风格
		}).on('error', sass.logError))
		.pipe( gulp.dest("./dist") )
})