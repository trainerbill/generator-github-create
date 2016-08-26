import gulp from 'gulp';
import * as builder from '@modern-mean/build-gulp';
import del from 'del';
import rename from 'gulp-rename';


function clean() {
  return del([
    './generators'
  ]);
}
clean.displayName = 'clean';
gulp.task(clean);

function genRename() {
  return gulp.src('./dist/generators/**/*')
    .pipe(gulp.dest('./generators'));
};

//gulp build
let build = gulp.series(clean, builder.build.src, genRename, builder.build.clean);
build.displayName = 'build';
gulp.task(build);

//gulp test
let test = gulp.series(builder.lint.all);
test.displayName = 'test';
gulp.task(test);

//gulp
let defaultTask = gulp.series(build);
defaultTask.displayName = 'default';
gulp.task(defaultTask);

//gulp watch
function watchFiles() {
  return gulp.watch(['./src/**/*'], gulp.series(build));
}
let watch = gulp.series(build, watchFiles);
watch.displayName = 'watch';
gulp.task(watch);
