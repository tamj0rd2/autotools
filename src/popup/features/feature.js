const R = require('ramda')

function FeatureError (featureName) {
  this.name = 'AutoTools FeatureError'
  this.message = `Invalid feature settings for feature: ${featureName}`
  this.stack = new Error().stack
}
FeatureError.prototype = Object.create(Error.prototype)
FeatureError.prototype.constructor = FeatureError

let Feature = class Feature {
  constructor (featureName, defaultSettings) {
    this.featureName = featureName
    this.defaultSettings = defaultSettings
    this.checkbox = $(`#${this.featureName}Cbx`)

    let settingNames = R.keys(this.defaultSettings)
    this.settingNames = R.without('enabled', settingNames)
  }

  init (featureSettings) {
    // enable/disable input fields based on settings
    $(this.checkbox).on('change', e => {
      this.settingNames.forEach(settingName => {
        $('#' + settingName).prop('disabled', !e.target.checked)
      })
    })
    $(this.checkbox).change()

    // set the values of each input field according to the settings
    this.settingNames.forEach(settingName => {
      $('#' + settingName).val(featureSettings[settingName])
    })
  }

  settingsAreValid (settings) {
    // TODO: add a way to validate settings
    return false
  }

  currentSettings () {
    // get the current settings. throws an error if settings are invalid
    let settings = {
      enabled: $(this.checkbox).prop('checked')
    }
    this.settingNames.forEach(settingName => {
      settings[settingName] = $('#' + settingName).val()
    })

    if (this.settingsAreValid(settings)) {
      return settings
    } else {
      throw new FeatureError(this.featureName)
    }
  }
}

module.exports = {
  Feature,
  FeatureError
}
