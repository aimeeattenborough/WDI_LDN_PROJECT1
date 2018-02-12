const pump = require('pump');
const gulp = require('gulp');
const sass = require('gulp-sass');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const sourcemaps = require('gulp-sourcemaps');
const del = require('del');
const browserSync = require('browser-sync').create();
const gulpIf = require('gulp-if');

gulp.task('clean:css', () => {
  return del(['public/css']);
});

gulp.task('clean:js', () => {
  return del(['public/js']);
});

gulp.task('clean:html', () => {
  return del(['public/index.html']);
});

gulp.task('clean:fonts', () => {
  return del(['public/fonts/**']);
});

gulp.task('clean:images', () => {
  return del(['public/images/**']);
});

gulp.task('clean:sounds', () => {
  return del(['public/sounds/**']);
});

gulp.task('fonts', ['clean:fonts'], () => {
  return gulp.src('src/fonts/**/*')
    .pipe(gulp.dest('public/fonts'));
});

gulp.task('images', ['clean:images'], () => {
  return gulp.src('src/images/**/*')
    .pipe(gulp.dest('public/images'));
});

gulp.task('sounds', ['clean:sounds'], () => {
  return gulp.src('src/sounds/**/*')
    .pipe(gulp.dest('public/sounds'));
});

gulp.task('html', ['clean:html'], () => {
  return gulp.src('src/index.html')
    .pipe(gulp.dest('public/'));
});

gulp.task('css', ['clean:css'], done => {
  pump([
    gulp.src('src/scss/style.scss'),
    gulpIf(!global.production, sourcemaps.init()),
    sass({ outputStyle: 'compressed' }).on('error', sass.logError),
    gulpIf(!global.production, sourcemaps.write()),
    gulp.dest('public/css')
  ], done);
});

gulp.task('js', ['clean:js'], done => {
  pump([
    gulp.src('src/js/app.js'),
    gulpIf(!global.production, sourcemaps.init()),
    babel({
      presets: ['env']
    }),
    uglify(),
    gulpIf(!global.production, sourcemaps.write()),
    gulp.dest('public/js')
  ], done);
});

gulp.task('build', ['images', 'sounds', 'html', 'css', 'js']);

gulp.task('deploy', () => {
  global.production = true;
  gulp.start(['build']);
});

gulp.task('default', ['build'], () => {
  gulp.watch('src/images/**', ['images']);
  gulp.watch('src/fonts/**', ['fonts']);
  gulp.watch('src/sounds/**', ['sounds']);
  gulp.watch('src/index.html', ['html']).on('change', browserSync.reload);
  gulp.watch('src/scss/style.scss', ['css']).on('change', browserSync.reload);
  gulp.watch('src/js/app.js', ['js']).on('change', browserSync.reload);

  browserSync.init({
    server: './public',
    online: false
  });
});
