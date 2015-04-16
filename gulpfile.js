/* ----------------------------------------------------------------------------------
　Plug In
---------------------------------------------------------------------------------- */
var gulp = require('gulp');
var server = require('gulp-webserver');
var sass = require('gulp-ruby-sass');
var plumber = require('gulp-plumber');
var autoprefixer = require("gulp-autoprefixer");
var pleeease = require('gulp-pleeease');

/* ----------------------------------------------------------------------------------
　Config
---------------------------------------------------------------------------------- */
var root = "htdocs",
    config = {
        "path" : {
        "htdocs"    :root,
        "sass"      :root+"/shared/sass/",
        "css"       :root+"/shared/css/",
        "js"        :root+"/shared/js/"
    }
};

/* ----------------------------------------------------------------------------------
　Live Reload
---------------------------------------------------------------------------------- */
gulp.task('server', function() {
    gulp.src(root+'/')
        .pipe(server({
            livereload:true,
            host:'portforio',
            port:'8000',
            open:true,
        }));
});

/* ----------------------------------------------------------------------------------
　Sass
---------------------------------------------------------------------------------- */
gulp.task('sass', function() {
    gulp.src(config.path.sass+'/*')
        .pipe(plumber())
        .pipe(sass({
            style:'expanded',
            'sourcemap=none': true,
            sourcemapPath:'dest',
            noCache:true
        }))
        .on('error',function (err){console.log(err.message);})
        .pipe(gulp.dest(config.path.css));
});

/* ----------------------------------------------------------------------------------
　Autoprefixer
---------------------------------------------------------------------------------- */
gulp.task('auto', function () {
    return gulp.src(config.path.css+'*.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions','Android 2.2','IE 9'],
            cascade: false
        }))
        .pipe(gulp.dest(config.path.css))
});

/* ----------------------------------------------------------------------------------
　Default Task
---------------------------------------------------------------------------------- */
gulp.task('default',['server'],function() {
    gulp.watch(config.path.sass+'/*',["sass"]);
    gulp.watch(config.path.css+'/*',["auto"]);
});