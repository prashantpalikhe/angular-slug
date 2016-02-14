(function () {
    'use strict';

    var gulp   = require('gulp');
    var concat = require('gulp-concat');
    var uglify = require('gulp-uglify');
    var rename = require("gulp-rename");

    gulp.task('concat', function () {
        return gulp.src(['./src/slug/slug.module.js', './src/slug/**/*.js'])
            .pipe(concat('all.js'))
            .pipe(gulp.dest('./dist/'));
    });

    gulp.task('compress', ['concat'], function () {
        return gulp.src('dist/all.js')
            .pipe(uglify())
            .pipe(rename('all.min.js'))
            .pipe(gulp.dest('dist'));
    });

    gulp.task('default', ['concat', 'compress']);
})();