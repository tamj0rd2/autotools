const FeatureError = require('./features/feature').FeatureError
let features = require('./features/features.js')
require('bootstrap/dist/css/bootstrap.min.css')
require('bootstrap/dist/js/bootstrap.min.js')
require('./bootstrap-toggle/bootstrap-toggle.min.js')
require('./bootstrap-toggle/bootstrap-toggle.min.css')
require('./popup.scss')

chrome.storage.sync.get(null, settings => {
  // initiate each feature so that they display correctly for the user
  for (let feature in features) {
    features[feature].init(settings[feature])
  }
})

let collectAndVerifySettings = () => {
  let settings = {}

  for (let feature in features) {
    try {
      settings[feature] = features[feature].currentSettings()
    } catch (e) {
      if (e instanceof FeatureError) {
        console.error(`${e.name}: ${e.message}\n${e.stack}`)
        return false
      } else {
        throw e
      }
    }
  }
  return settings
}

$('#save').click(() => {
  let settings = collectAndVerifySettings()
  if (settings) {
    console.log('%csettings should be saved', 'color: green')
  } else {
    console.log('oh poop...')
  }
  // save them...
  return false
})
