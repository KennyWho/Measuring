var watchify = require('watchify');
var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var vueify = require('vueify')
var customOpts = {
  entries: ['./src/script.js']
};
var b = watchify(browserify(customOpts).transform(vueify));

gulp.task('js', bundle);
b.on('update', bundle);
b.on('log', console.log);
function bundle() {
  return b.bundle()
    .on('error', function (err) {
      if (err) throw err;
        console.log('Browserify Error')
    })
    .pipe(source('script.js'))
    .pipe(buffer())
    .pipe(gulp.dest('./dist'));
}