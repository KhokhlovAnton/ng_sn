var gulp = require('gulp'),
    cleanCSS = require('gulp-clean-css'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    del = require('del');

gulp.task('clean',function(){
    return del.sync('build');
})

gulp.task('build',['scripts'],function(){
    var buildcss = gulp.src('ng_sn/css/*')
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('ng_sn/build/css'));
    var buildjs = gulp.src('ng_sn/js/*')
        .pipe('uglify')
        .pipe(gulp.dest('ng_sn/build/js'));
    var buildhtml = gulp.src('ng_sn/*.html')
        .pipe(gulp.dest('ng_sn/build'));
})