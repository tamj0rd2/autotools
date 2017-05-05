const gulp = require('gulp')
const gulpUtil = require('gulp-util')
const path = require('path')
const zip = require('gulp-zip')
const signAddon = require('sign-addon').default
const amoJson = require('../amo.json')
const readline = require('readline-sync')

let buildXpi = function (xpi) {
  gulp.src(xpi.src)
    .pipe(zip(xpi.name))
    .pipe(gulp.dest(xpi.path))
}

let signXpi = function (xpi) {
  signAddon({
    xpiPath: path.join(xpi.path, xpi.name),
    id: xpi.id,
    version: xpi.version,
    apiKey: amoJson.AMO_JWT_ISSUER,
    apiSecret: amoJson.AMO_JWT_SECRET,
    downloadDir: xpi.path
  })
}

let confirmBuild = function (xpi) {
  let posOps = ['y', 'yes']
  let negOps = ['n', 'no']
  let allOps = posOps.concat(negOps)

  let answer = readline.question(
    `Are you SURE you want to sign xpi version ${xpi.version}? `,
    {
      trueValue: posOps,
      falseValue: negOps,
      limit: allOps,
      limitMessage: `Enter one of the following options: [${allOps}]\n`
    }
  )
  return answer
}

let generateXpi = function (xpiPath, xpiSrc) {
  const manifest = require(path.join(xpiSrc, 'manifest.json'))

  let xpi = {
    name: `${manifest.name}_${manifest.version}_unsigned.xpi`,
    path: xpiPath,
    src: `${xpiSrc}/**/*`,
    version: manifest.version,
    id: manifest.id
  }

  buildXpi(xpi)
  if (confirmBuild(xpi)) {
    signXpi(xpi)
  } else {
    throw new gulpUtil.PluginError({
      plugin: 'build:firefox',
      message: 'Firefox sign process cancelled by user'
    })
  }
}

module.exports = generateXpi
