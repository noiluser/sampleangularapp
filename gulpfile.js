var gulp = require('gulp')
var cleanCSS = require('gulp-clean-css');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var del = require('del');


gulp.task('clean', function() {
    return del.sync('public/dist');
});

gulp.task('minify-css', function() {
	  return gulp.src('public/*.css')
	    .pipe(cleanCSS({compatibility: 'ie8'}))
	    .pipe(rename({suffix: '.min'}))
	    .pipe(gulp.dest('public/dist'));
});

gulp.task('scripts', function() {
    return gulp.src(['public/js/**/*.js', '!public/js/lib/*.js'])
        .pipe(concat('app.min.js')) 
        .pipe(uglify()) 
        .pipe(gulp.dest('public/dist')); 
});

gulp.task('default', ['clean', 'scripts', 'minify-css']);