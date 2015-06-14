/// <binding Clean='clean' />

var gulp = require("gulp"),
    rimraf = require("rimraf"),
    fs = require("fs"),
    sourcemaps = require('gulp-sourcemaps'),
    sass = require('gulp-sass');

eval("var project = " + fs.readFileSync("./project.json"));

var paths = {
    bower: "./bower_components/",
    lib: "./" + project.webroot + "/lib/",
    cssFolder: './' + project.webroot + '/css',
    sassFiles: './Assets/Styles/**/*.scss'
};

gulp.task("clean", function (cb) {
  rimraf(paths.lib, cb);
});

gulp.task("copy", ["clean"], function () {
  var bower = {
    "bootstrap": "bootstrap/dist/**/*.{js,map,css,ttf,svg,woff,eot}",
    "bootstrap-touch-carousel": "bootstrap-touch-carousel/dist/**/*.{js,css}",
    "hammer.js": "hammer.js/hammer*.{js,map}",
    "jquery": "jquery/jquery*.{js,map}",
    "jquery-validation": "jquery-validation/jquery.validate.js",
    "jquery-validation-unobtrusive": "jquery-validation-unobtrusive/jquery.validate.unobtrusive.js"
  }

  for (var destinationDir in bower) {
    gulp.src(paths.bower + bower[destinationDir])
      .pipe(gulp.dest(paths.lib + destinationDir));
  }
});

gulp.task('sass', function () {
    gulp.src(paths.sassFiles)
        .pipe(sourcemaps.init())
            .pipe(sass().on('errer', sass.logError))
        .pipe(sourcemaps.write('/maps'))
        .pipe(gulp.dest(paths.cssFolder));
});

gulp.task('watch', ['sass'], function () {
    gulp.watch(paths.sassFiles, ['sass']);
});

gulp.task('default', ['watch']);
