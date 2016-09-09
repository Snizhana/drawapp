const gulp = require('gulp'),
  babel = require('gulp-babel'),
  livereload = require('gulp-livereload'),
  sass = require('gulp-ruby-sass'),
  autoprefixer = require('gulp-autoprefixer');


gulp.task('styles', () => {
  return sass('static/style/sass/*.scss', {style: 'expanded'})
  .on('error', sass.logError)
  .pipe(autoprefixer())
  .pipe(gulp.dest('static/style/css/'))
  .pipe(livereload());
});

gulp.task('scripts', () => {
  return gulp.src('static/js/src/**/*.js')
    .pipe(babel({
      presets: 'es2015'
    }))
    .pipe(gulp.dest('static/js/dist'));
});

gulp.task('default', () => {
  livereload.listen();
  gulp.watch('static/js/src/**/*.js', ['scripts']);
  gulp.watch('static/style/sass/*.scss', ['styles']);
});
