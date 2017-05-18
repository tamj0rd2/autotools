let initiateStorageVals = () => {
  let featureSettings = {
    enabled: false,
    firstName: '',
    lastName: ''
  }
  chrome.storage.sync.set({autoAssign: featureSettings})
  return featureSettings
}

let featureToggled = (e) => {
  $('#firstName').prop('disabled', !e.target.checked)
  $('#lastName').prop('disabled', !e.target.checked)
}

let autoAssign = (featureSettings) => {
  if ($.isEmptyObject(featureSettings)) {
    featureSettings = initiateStorageVals()
  }

  $('#autoAssignCbx').on('change', featureToggled)
  $('#autoAssignCbx').prop('checked', featureSettings.enabled).change()
}

module.exports = autoAssign
