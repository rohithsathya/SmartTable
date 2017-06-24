var gulp = require("gulp");
var minify = require('gulp-minify');
var embedTemplates = require('gulp-angular-embed-templates');

gulp.task('js:build', function () {
    gulp.src('src/*.js')
        .pipe(embedTemplates())
        .pipe(minify({
            ext: {
                src: '.js',
                min: '.min.js'
            }
        }))
        .pipe(gulp.dest('./dist'));
});

gulp.task('compress', function () {
    gulp.src('src/*.js')
        .pipe(minify({
            ext: {
                src: '.js',
                min: '.min.js'
            }
        }))
        .pipe(gulp.dest('dist'))
});
gulp.task('default', ['js:build']);

