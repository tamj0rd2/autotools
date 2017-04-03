var gulp = require('gulp')
var path = require('path')
var webpack = require('gulp-webpack')
var webpackConfig = require('./webpack.config.js')

var paths = {
  'base': webpackConfig.output.path
}

var outPaths = {
  'base': paths.base,
  'images': path.join(paths.base, 'images'),
  'html': path.join(paths.base, 'html'),
  'js': path.join(paths.base, 'js'),
  'css': path.join(paths.base, 'css')
}

var globs = {
  'base': 'src/*',
  'images': 'src/images/**/*',
  'html': 'src/html/**/*',
  'js': 'src/js/**/*',
  'css': 'src/css/**/*'
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

gulp.task('build', ['collect', 'bundle'])

gulp.task('watch', ['build'], function () {
  gulp.watch([globs.base, globs.images, globs.html], ['collect'])
  gulp.watch([globs.js, globs.css], ['bundle'])
})
