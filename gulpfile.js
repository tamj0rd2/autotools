/* eslint-disable no-console */
const gulp = require('gulp')
const clean = require('gulp-clean')
const path = require('path')
const webpack = require('gulp-webpack')
const webpackConfig = require('./webpack.config.js')
const amoConfig = require('./config.js').amo
const zip = require('gulp-zip')
const makeXpi = require('./scripts/firefox-build')
const fs = require('fs')
const redText = require('colors/safe').red

const paths = {
  src: './src',
  dev: './build/dev',
  firefox: './build/firefox'
}

const globs = {
  static: {
    src: [
      `${paths.src}/manifest.json`,
      `${paths.src}/images/**/*`,
      `${paths.src}/popup/popup.html`
    ],
    output: [
      `${paths.dev}/manifest.json`,
      `${paths.dev}/images/`,
      `${paths.dev}/popup/popup.html`
    ]
  },
  extension: {
    src: `${paths.src}/extension/**/*`,
    output: `${paths.dev}/`,
    filename: 'extension.bundle.js'
  },
  popup: {
    src: `${paths.src}/popup/**/*`,
    output: `${paths.dev}/popup/`,
    filename: 'popup.bundle.js'
  }
}

gulp.task('clean:static', () => {
  return gulp.src(globs.static.output, {read: false})
    .pipe(clean())
})

gulp.task('bundle:static', ['clean:static'], () => {
  return gulp.src(globs.static.src, {base: `${paths.src}/`, nodir: true})
    .pipe(gulp.dest(`${paths.dev}`))
})

gulp.task('clean:extension', () => {
  let bundlePath = path.join(globs.extension.output, globs.extension.filename)
  return gulp.src(bundlePath, {read: false})
    .pipe(clean())
})

gulp.task('bundle:extension', ['clean:extension'], () => {
  let config = webpackConfig.extension(paths, globs)

  return gulp.src(config.entry)
    .pipe(webpack(config))
    .pipe(gulp.dest(globs.extension.output))
})

gulp.task('clean:popup', () => {
  return gulp.src(globs.popup.output, {read: false})
    .pipe(clean())
})

gulp.task('bundle:popup', ['clean:popup'], () => {
  let config = webpackConfig.popup(paths, globs)

  return gulp.src(config.entry)
    .pipe(webpack(config))
    .pipe(gulp.dest(globs.popup.output))
})

gulp.task('clean', ['clean:static', 'clean:extension', 'clean:popup'])

gulp.task('build', ['bundle:static', 'bundle:extension', 'bundle:popup'])

gulp.task('watch', ['build'], () => {
  gulp.watch(globs.static.src, ['bundle:static'])
  gulp.watch(globs.extension.src, ['bundle:extension'])
  gulp.watch(globs.popup.src, ['bundle:popup'])
})

gulp.task('release:firefox', ['build'], () => {
  let xpi = (() => {
    let manifest = require(`${paths.dev}/manifest.json`)

    let unsigned = {
      name: `${manifest.name}_${manifest.version}_unsigned.xpi`,
      srcPath: `${paths.dev}/**/*`,
      outPath: paths.firefox
    }

    return {
      unsigned,
      signed: {
        xpiPath: `${unsigned.outPath}/${unsigned.name}`,
        id: manifest.applications.gecko.id,
        version: manifest.version,
        apiKey: amoConfig.AMO_API_KEY,
        apiSecret: amoConfig.AMO_SECRET_KEY,
        downloadDir: unsigned.outPath
      }
    }
  })()

  fs.stat(`${xpi.unsigned.outPath}/${xpi.unsigned.name}`, (err) => {
    if (!err) {
      console.log(redText('ERROR: The unsigned XPI already exists!'))
    } else {
      return gulp.src(globs.static.output)
        .pipe(zip(xpi.unsigned.name))
        .pipe(gulp.dest(xpi.unsigned.outPath))
        .pipe(makeXpi(xpi.signed))
    }
  })
})
