'use strict';

var gulp        = require('gulp'),
    sass        = require('gulp-sass'),
    rename      = require('gulp-rename'),
    browserSync = require('browser-sync'),
    jasmine     = require('gulp-jasmine'),
    reload      = function () {
        browserSync.reload();
    };



// Static Server + watching scss/html files
gulp.task('serve', ['sass', 'jasmine'], function() {

    browserSync.init({
        server: "./"
    });

    gulp.watch("./scss/*.scss", ['sass']);
    gulp.watch(["./css/*.css", "./js/*.js", "./*.html", "./**/*.html"], reload);

});

// Sass stuff
gulp.task('sass', function () {
    gulp.src('./scss/*.scss')
        .pipe(sass({outputStyle: 'expanded'}))
        .pipe(gulp.dest('./css'))
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(rename({extname: '.min.css'}))
        .pipe(gulp.dest('./css'));
});

gulp.task('jasmine', function () {
    return gulp.src('spec/appSpec.js')
        // gulp-jasmine works on filepaths so you can't have any plugins before it
        .pipe(jasmine({
            showColors: true,
            print: function() {
                process.stdout.write(util.format.apply(this, arguments));
            }
        }));
});

// Run
gulp.task('default', ['serve']);
