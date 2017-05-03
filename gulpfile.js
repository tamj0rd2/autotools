var gulp = require('gulp')
var path = require('path')
var webpack = require('gulp-webpack')
var webpackConfig = require('./webpack.config.js')

var projectRoot = webpackConfig.output.path

var outPaths = (function () {
  let dist = path.join(projectRoot, 'dist')

  return {
    base: dist,
    images: path.join(dist, 'images'),
    html: path.join(dist, 'html'),
    js: path.join(dist, 'js'),
    css: path.join(dist, 'css'),
  }
})()

var globs = {
  base: 'src/*',
  images: 'src/images/**/*',
  html: 'src/html/**/*',
  js: 'src/js/**/*',
  css: 'src/css/**/*'
}

// collect source items used for the actual extension
gulp.task('collect', function () {
  gulp.src(globs.base)
    .pipe(gulp.dest(outPaths.base))

  gulp.src(globs.images)
    .pipe(gulp.dest(outPaths.images))

  gulp.src(globs.html)
    .pipe(gulp.dest(outPaths.html))
})

// build the webpack bundle
gulp.task('bundle', function () {
  return gulp.src(webpackConfig.entry)
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest(outPaths.js))
})

gulp.task('build:src', ['collect', 'bundle'])


gulp.task('watch', ['build:src'], function () {
  gulp.watch([globs.base, globs.images, globs.html], ['collect'])
  gulp.watch([globs.js, globs.css], ['bundle'])
})
