/* eslint-disable no-console */
const gulpUtil = require('gulp-util')
const through = require('through2')
const PluginError = gulpUtil.PluginError
const readline = require('readline-sync')
const redText = require('colors/safe').red
const signAddon = require('sign-addon').default

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

let xpiSigner = (xpiConfig) => {
  const PLUGIN_NAME = 'xpi-signer'

  if (!xpiConfig) {
    throw new PluginError(PLUGIN_NAME, 'You need to provide config')
  }

  return through.obj((file, enc, cb) => {
    if (file.isStream()) {
      this.emit(
        'error',
        new PluginError(PLUGIN_NAME, 'Streams are not supported')
      )
      return cb()
    }

    if (file.isBuffer()) {
      if (confirmBuild(xpiConfig)) {
        signAddon(xpiConfig)
        cb()
      } else {
        console.log(redText('Signing cancelled by user'))
        return cb()
      }
    }
  })
}

module.exports = xpiSigner
