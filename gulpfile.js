var gulp = require("gulp");
var minify = require('gulp-minify');
var embedTemplates = require('gulp-angular-embed-templates');
var download = require("gulp-download");

gulp.task('js:build', function () {
    gulp.src('src/*.js')
        .pipe(embedTemplates())
        .pipe(minify({
            ext: {
                min: '.min.js',
                noSource:true,
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

gulp.task('downloadDependencies',function(){

    var dependencies = [
        "https://rohithsathya.github.io/SmartTable/dist/rsat.ui.icons.js",
        "https://rohithsathya.github.io/rsat.ui/dist/rsat.ui.elements.min.js",
        "https://rohithsathya.github.io/rsat.ui/dist/rsat.ui.elements.min.css"

    ];
    for(var i=0;i<dependencies.length;i++){
        download(dependencies[i]).pipe(gulp.dest("./dist"));
    }

    

});
gulp.task('default', ['js:build','downloadDependencies']);

