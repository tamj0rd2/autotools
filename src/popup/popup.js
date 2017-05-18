require('bootstrap/dist/css/bootstrap.min.css')
require('bootstrap/dist/js/bootstrap.min.js')
require('./bootstrap-toggle/bootstrap-toggle.min.js')
require('./bootstrap-toggle/bootstrap-toggle.min.css')
require('./popup.scss')

chrome.storage.sync.get(null, (settings) => {
  require('./features/auto-assign')(settings.autoAssign)
})
