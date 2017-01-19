var gulp = require('gulp');
var sass = require('gulp-sass');


gulp.task('buildSass', function() {
	gulp.src('src/sass/index.scss')
	    .pipe(sass())
	    .pipe(gulp.dest('src/css'))
});

gulp.task('jtSass',function(){
	gulp.watch('src/sass/*',['buildSass']);
})