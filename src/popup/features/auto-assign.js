const defaultFeatureSettings = {
  enabled: false,
  firstName: '',
  lastName: ''
}

let setStorageVals = featureSettings => {
  chrome.storage.sync.set({ autoAssign: featureSettings })
  return featureSettings
}

let featureToggled = e => {
  $('#firstName').prop('disabled', !e.target.checked)
  $('#lastName').prop('disabled', !e.target.checked)
}

module.exports = {
  initiate: featureSettings => {
    if ($.isEmptyObject(featureSettings)) {
      featureSettings = setStorageVals(defaultFeatureSettings)
    }

    $('#autoAssignCbx').on('change', featureToggled)
    $('#autoAssignCbx').prop('checked', featureSettings.enabled).change()
    $('#firstName').val(featureSettings.firstName)
    $('#lastName').val(featureSettings.lastName)
  },
  save: () => {
    setStorageVals({
      enabled: $('#autoAssignCbx').prop('checked'),
      firstName: $('#firstName').val(),
      lastName: $('#lastName').val()
    })
    console.log('saved :>')
  }
}
