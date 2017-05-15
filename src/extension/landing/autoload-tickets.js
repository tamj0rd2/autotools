var helpers = require('./helpers')

$(document).ready(() => {
  let frame = $('#PageContainerFrame')
  helpers.loadAPage(frame, helpers.urls.toolbar.Tickets)
})
