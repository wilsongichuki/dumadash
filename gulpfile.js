'use strict';

var gulp        = require('gulp'),
    sass        = require('gulp-sass'),
    rename      = require('gulp-rename'),
    del         = require('del'),
    clean       = require('gulp-clean'),
    browserSync = require('browser-sync').create(),
    jasmine     = require('gulp-jasmine'),
    runSequence = require('run-sequence'),
    git = require('gulp-git'),
    uglify = require('gulp-uglify');

// Sass stuff
gulp.task('sass', function () {
    gulp.src('./src/scss/*.scss')
        .pipe(sass({outputStyle: 'expanded'}))
        .pipe(gulp.dest('./dist/css'))
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(rename({extname: '.min.css'}))
        .pipe(gulp.dest('./dist/css'));
});

// Javascript stuff
gulp.task('js', function () {
    return gulp.src('./src/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js'));
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

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {
    browserSync.init({
        server: "./dist"
    });

    gulp.watch("./src/scss/*.scss", ['sass']);
    gulp.watch("./src/js/*.js", ['js']);
    gulp.watch("./src/**/*").on('change', browserSync.reload);
    gulp.watch("./dist/**/*").on('change', browserSync.reload);

});


// Run
gulp.task('default', ['serve']);



// BUILDING FILES
// Delete when copying files
gulp.task('clean:dist', function(){
    return del(
        ['C:/Users/wilso_000/Desktop/dumadash-gh-pages/*.html', 'C:/Users/wilso_000/Desktop/dumadash-gh-pages/css', 'C:/Users/wilso_000/Desktop/dumadash-gh-pages/js', 'C:/Users/wilso_000/Desktop/dumadash-gh-pages/fonts', '!C:/Users/wilso_000/Desktop/dumadash-gh-pages/wireframes/**/*'],
        {force: true});
});

// Copy final files to dist folder
gulp.task('copy:src', function(){
    return gulp.src('dist/**/**/*', {base: 'dist'})
        .pipe(gulp.dest('C:/Users/wilso_000/Desktop/dumadash-gh-pages'));
});

// Build the project by running the sequence
gulp.task('build', function(){
    runSequence('clean:dist', 'copy:src');
});

// git status && git add --all && git commit -a -m "minor fixes"
// git pull && git push