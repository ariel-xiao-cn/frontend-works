'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var imagemin = require('gulp-imagemin');
var babel = require('gulp-babel');
var uglify = require('gulp-uglify');
var cleanCSS = require('gulp-clean-css');
var htmlmin = require('gulp-htmlmin');
const autoprefixer = require('gulp-autoprefixer');


gulp.task('minify-img', () =>
    gulp.src('public/src/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('public/dist/images'))
);

gulp.task('sass', function() {
    return gulp.src('public/src/css/*.scss')
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(gulp.dest('public/dist/css'));
});

gulp.task('sass:watch', function() {
    gulp.watch('public/src/images/*', ['minify-img']);
    gulp.watch('public/src/css/*.scss', ['sass']);
    gulp.watch('public/src/pages/*.html', ['minify-html']);
});


//default
gulp.task('default', ['minify-img', 'sass', 'minify-html','minify-js-1','minify-js-2','minify-js-3'], () =>
    console.log("hello gulp")
);

// 编译并压缩js
gulp.task('minify-js-1', () =>
    gulp.src('public/src/js/**/*.js')
    .pipe(babel({
        presets: ['es2015']
    }))
    .pipe(uglify())
    .pipe(gulp.dest('public/dist/js'))
);

gulp.task('minify-js-2', () =>
    gulp.src('public/src/js/lib/*.js')
    .pipe(babel({
        presets: ['es2015']
    }))
    .pipe(uglify())
    .pipe(gulp.dest('public/dist/js/lib'))
);

gulp.task('minify-js-3', () =>
    gulp.src('public/src/js/app/*.js')
    .pipe(babel({
        presets: ['es2015']
    }))
    .pipe(uglify())
    .pipe(gulp.dest('public/dist/js/app'))
);

gulp.task('minify-html', () =>
    gulp.src('public/src/pages/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('public/dist/pages/'))
);