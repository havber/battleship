var gulp       = require('gulp'),
    browserify = require('browserify'),
    transform  = require('vinyl-transform'),
    browsersync = require('browser-sync'),
    less = require('gulp-less');

gulp.task('browser-sync', function() {
    browsersync({
        proxy: 'localhost:8000'
    });
});

gulp.task('browserify', function () {
    var browserified = transform(function(filename) {
        var b = browserify(filename);
        return b.bundle();
    });

    return gulp.src(['./src/js/*.js'])
        .pipe(browserified)
        .pipe(gulp.dest('./app/public/js/'));
});

gulp.task('less', function() {
    return gulp.src('./src/less/**/*.less')
        .pipe(less())
        .pipe(gulp.dest('./app/public/css'));
});

gulp.task('default', ['browser-sync'], function() {
    gulp.watch('src/js/**/*.js', ['browserify', browsersync.reload]);
    gulp.watch('src/less/**/*.less', ['less', browsersync.reload]);
});
