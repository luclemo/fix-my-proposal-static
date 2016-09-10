// Load plugins
var gulp = require('gulp'),
	stylus = require('gulp-stylus'),
	autoprefixer = require('gulp-autoprefixer'),
	minifyCss = require('gulp-minify-css'),
	rename = require('gulp-rename'),
	browserSync = require('browser-sync'),
	sourcemaps = require('gulp-sourcemaps'),
	jade = require('gulp-jade'),
	imagemin = require('gulp-imagemin'),
	reload = browserSync.reload;

// Styles
gulp.task('styles', function(){
	 gulp.src('./src/css/style.styl')
		.pipe(sourcemaps.init())
		.pipe(stylus())
		.pipe(autoprefixer({
				browsers: ['last 2 versions']
			}))
		.pipe(rename({ suffix: '.min' }))
		.pipe(minifyCss())
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('./_build/'))
		.pipe(reload({ stream : true }))
});

// Templates
gulp.task('templates',function(){
  gulp.src(['./src/*.jade'])
    .pipe(jade({
	    pretty : true
	  }))
    .pipe(gulp.dest('./_build/'))
    .pipe(reload({ stream : true }))
});

// Images
gulp.task('images', function() {
  return gulp.src('./src/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('./_build/img'))
    .pipe(reload({ stream : true }))
});


// Start the server
gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: "./_build"
        }
    });
});

// Watch!
gulp.task('watch', ['browser-sync'], function(){
	gulp.watch('./src/*.jade', ['templates']);
	gulp.watch('./src/css/**/*.styl', ['styles']);
	gulp.watch('./src/images/*', ['images']);
});
