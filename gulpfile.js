var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var minhtml = require('gulp-htmlmin');
var mincss = require('gulp-clean-css');
var server = require('gulp-webserver');
var url = require('url');
var path = require('path');
var fs = require('fs');

//压缩css
gulp.task('sass', function() {
    gulp.src('src/**/*.scss')
        .pipe(sass())
        .pipe(concat('all.css'))
        .pipe(mincss())
        .pipe(gulp.dest('src/css'))
        .pipe(gulp.dest('build/css'))
});
//压缩js
gulp.task('uglify', function() {
    gulp.src('src/**/*.js')
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(gulp.dest('src/js'))
        .pipe(gulp.dest('build/js'))
});
//压缩html
gulp.task('minhtml', function() {
    gulp.src('src/*.html')
        .pipe(minhtml({
            collapseWhitespace: true
        }))
        .pipe(gulp.dest('build'))
});
//起服务
gulp.task('server', function() {
    gulp.src('build')
        .pipe(server({
            port: 8888,
            livereload: true,
            middleware: function(req, res, next) {
                if (req.url === 'favicon.ico') {
                    return;
                }
                pathname = req.url === '/' ? '/index.html' : pathname;
                res.end(fs.readFileSync(path.join(__dirname, 'build', pathname)));
            }
        }))
});

gulp.task('default', ['sass', 'uglify', 'minhtml', 'server']);