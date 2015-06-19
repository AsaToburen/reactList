var gulp = require('gulp'),
    connect = require('gulp-connect'),
    open = require('gulp-open'),
    react = require('gulp-react'),
    browserify = require('browserify'),
    babelify = require('babelify'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer-core'),
    csswring = require('csswring'),
    uglify = require('gulp-uglify'),
    buffer = require('vinyl-buffer'),
    source = require('vinyl-source-stream'),
    port = process.env.port || 8080;

gulp.task('browserify', function() {
    return browserify('./app/src/js/components/app.js')
        .transform(babelify)
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(uglify())
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

gulp.task('styles', function() {
    var processors = [
        autoprefixer({
            browsers: ['last 2 versions']
        }),
        csswring,
    ];

    return gulp.src('./app/src/css/*.css')
        .pipe(postcss([ require('postcss-simple-vars')({ silent: true }) ]))
        .pipe(postcss([
            require('postcss-nested'),
            require('postcss-simple-vars'),
            require('autoprefixer-core')('last 3 versions'),
            require('cssnext')
            ]))
        .pipe(gulp.dest('./app/dist/css'))
        .pipe(connect.reload());
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
    gulp.watch('app/src/css/*.css', ['styles']);
    gulp.watch('app/index.html', ['html']);
    gulp.watch('app/src/js/**/*.js', ['browserify']);
});

gulp.task('default', ['browserify']);

gulp.task('serve', ['browserify',  'watch', 'styles', 'connect', 'open']);
