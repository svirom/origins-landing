const {src, dest, watch, series, parallel} = require('gulp');

const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync');
const autoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');
const terser = require('gulp-terser');
const merge = require('merge-stream');
const del = require('del');

function browsersync() {
  browserSync.init({
    server : {
      baseDir: 'app/'
    },
		port: 8080,
		//notify: false
  });
}

function cleanDist() {
  return del('dist');
}

function styles() {
  const css = src([
    'app/vendor/css/bootstrap-grid.css',
    'app/sass/**/*+(.sass|scss)'
  ])
    .pipe(sass({outputStyle: 'expanded'}))
    .on('error', sass.logError)
    .pipe(concat('custom.css'))
    .pipe(autoprefixer({
      overrideBrowserslist: ['last 5 version'],
      grid: true
    }))
    .pipe(dest('app/css'));

  const minCSS = src([
    'app/vendor/css/bootstrap-grid.css',
    'app/sass/**/*+(.sass|scss)'
  ])
    .pipe(sass({outputStyle: 'compressed'}))
    .on('error', sass.logError)
    .pipe(concat('custom.min.css'))
    .pipe(autoprefixer({
      overrideBrowserslist: ['last 5 version'],
      grid: true
    }))
    .pipe(cleanCSS())
    .pipe(dest('app/css'));

  return merge(css, minCSS)
    .pipe(browserSync.stream());
}

function scripts() {
  return src([
    // 'node_modules/jquery/dist/jquery.js',
    'app/js/custom.js'
  ])
    .pipe(concat('custom.min.js'))
    .pipe(terser())
    .pipe(dest('app/js'))
    .pipe(browserSync.stream());
}

function watching() {
  watch(['app/sass/**/*.scss'], styles);
  watch(['app/js/**/*.js', '!app/js/custom.min.js'], scripts);
  watch(['app/*.html']).on('change', browserSync.reload);
}

function build() {
  return src([
    'app/css/custom.css',
    'app/css/custom.min.css',
    // 'app/fonts/**/*',
    'app/js/custom.js',
    'app/js/custom.min.js',
    'app/img/**/*',
    'app/*.html'
  ], {base: 'app'})
    .pipe(dest('dist'))
}

exports.styles = styles;
exports.watching = watching;
exports.browsersync = browsersync;
exports.scripts = scripts;
exports.clean = cleanDist;

exports.default = parallel(styles, scripts, browsersync, watching);
exports.build = series(cleanDist, build);