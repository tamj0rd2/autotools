const features = require('./features/features.js')
require('bootstrap/dist/css/bootstrap.min.css')
require('bootstrap/dist/js/bootstrap.min.js')
require('./bootstrap-toggle/bootstrap-toggle.min.js')
require('./bootstrap-toggle/bootstrap-toggle.min.css')
require('./popup.scss')

chrome.storage.sync.get(null, (settings) => {
  features.autoAssign.initiate(settings.autoAssign)
})
