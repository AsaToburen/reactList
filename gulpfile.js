var gulp = require('gulp'),
    connect = require('gulp-connect'),
    open = require('gulp-open'),
    react = require('gulp-react'),
    browserify = require('browserify'),
    concat = require('gulp-concat'),
    streamify = require('gulp-streamify'),
    uglify = require('gulp-uglify'),
    reactify = require('reactify'),
    source = require('vinyl-source-stream'),
    port = process.env.port || 8080;

gulp.task('browserify', function() {
    return browserify('./app/src/js/components/app.js')
        .transform(reactify)
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('./app/dist/js'));
});

gulp.task('open', function() {
    var options = {
        url: 'http://localhost:' + port,
        app: 'google chrome'
    };
    gulp.src('./app/index.html')
        .pipe(open('', options));
});

gulp.task('connect', function() {
    connect.server({
        root: 'app',
        port: port,
        livereload: true
    });
});

gulp.task('scripts', function() {
    gulp.src('./app/dist/**/*.js')
        .pipe(connect.reload());
});

gulp.task('html', function() {
    gulp.src('./app/index.html')
        .pipe(connect.reload());
});

gulp.task('watch', function() {
    gulp.watch('app/dist/js/*.js', ['scripts']);
    gulp.watch('app/index.html', ['html']);
    gulp.watch('app/src/js/**/*.js', ['browserify']);
});

gulp.task('default', ['browserify']);

gulp.task('serve', ['browserify', 'connect', 'open', 'watch']);
