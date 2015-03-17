var gulp       = require('gulp'),
    browserify = require('browserify'),
    transform  = require('vinyl-transform'),
    livereload = require('gulp-livereload');

gulp.task('browserify', function () {
    var browserified = transform(function(filename) {
        var b = browserify(filename);
        return b.bundle();
    });

    return gulp.src(['./src/js/*.js'])
        .pipe(browserified)
        .pipe(gulp.dest('./app/public/js/')).
        pipe(livereload());
});

gulp.task('watch', function() {
    //livereload.listen();
    gulp.watch('src/**/*', ['browserify']);
});

gulp.task('default', ['browserify']);
