'use strict';

const gulp = require('gulp');

const sass = require('gulp-sass');
const sassGlob = require('gulp-sass-glob');
const groupMediaQueries = require('gulp-group-css-media-queries');
const cleanCSS = require('gulp-cleancss');

const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');

const plumber = require('gulp-plumber');
const browserSync = require('browser-sync').create();
const sourcemaps = require('gulp-sourcemaps');
const rename = require('gulp-rename');

const imagemin = require('gulp-imagemin');

const del = require('del');
const replace = require('replace');

const paths = {
    src: "./src/",
    build: "./docs/"
};

function clean() {
    return del(paths.build);
}

function styles() {
    return gulp.src(paths.src + "scss/styles.scss")
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sassGlob())
        .pipe(sass({
            includePaths: require('node-normalize-scss').includePaths
        }))
        .pipe(groupMediaQueries())
        .pipe(cleanCSS())
        .pipe(rename({suffix: ".min"}))
        .pipe(sourcemaps.write("/"))
        .pipe(gulp.dest(paths.build + "css/"));
}

function scripts() {
    return gulp.src(paths.src + "js/**/*.js")
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(babel({presets: ['env']}))
        .pipe(uglify())
        .pipe(concat("scripts.min.js"))
        .pipe(sourcemaps.write("/"))
        .pipe(gulp.dest(paths.build + "js/"));
}

function html() {
    return gulp.src(paths.src + "*.html")
        .pipe(plumber())
        // .pipe(replace(/\n\s*<!--DEV[\s\S]+?-->/gm, ""))
        .pipe(gulp.dest(paths.build));
}

function images() {
    return gulp.src(paths.src + "img/*.*")
        .pipe(imagemin({progressive: true}))
        .pipe(gulp.dest(paths.build + "img/"));
}

function watch() {
    gulp.watch(paths.src + "scss/**/*.scss", styles);
    gulp.watch(paths.src + "js/**/*.js", scripts);
    gulp.watch(paths.src + "*.html", html);

    gulp.watch(paths.src + "img/*.*", images);
}

function serve() {
    browserSync.init({
        server: {
            baseDir: paths.build
        }
    });
    browserSync.watch(paths.build + "**/*.*", browserSync.reload);
}

gulp.task("clean", clean);
gulp.task("styles", styles);
gulp.task("scripts", scripts);
gulp.task("html", html);
gulp.task("images", images);
gulp.task("watch", watch);
gulp.task("serve", serve);
gulp.task("default", gulp.series(
    clean,
    gulp.parallel(styles, scripts, html, images),
    gulp.parallel(watch, serve)
));
