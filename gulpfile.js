var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

gulp.task('compress', function (cb) {
    return gulp.src('svg-scroll.js')
        .pipe(uglify()) 
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(function(file) {
            return file.base;
        }))
});

gulp.task('copy-min-js-to-docs', function() {
    gulp.src('./svg-scroll.min.js')
    .pipe(gulp.dest('./docs'));
});

gulp.task('default', ['compress', 'copy-min-js-to-docs']);