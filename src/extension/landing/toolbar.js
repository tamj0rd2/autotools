/*
 * Add toolbar with 1-click shortcuts
 */

require('./toolbar.scss')
var helpers = require('./helpers')
var R = require('ramda')

$(document).ready(() => {
  let $toolbar = $('<div>', {
    id: 'AT3Toolbar',
    class: 'ButtonGroup'
  })

  // get a reference to the main frame
  let frame = $('#PageContainerFrame')

  let addBtnToToolbar = (btnText, url) => {
    let $btn = $('<button>', {
      class: 'AT3ToolbarBtn',
      text: btnText,
      click () {
        helpers.loadAPage(frame, url)
      }
    })
    $($toolbar).append($btn)
  }

  // create and add each button to the toolbar
  for (let key in helpers.urls.toolbar) {
    addBtnToToolbar(key, helpers.urls.toolbar[key])
  }

  // add the toolbar to the DOM
  $('#SiteNavigationBar').append($toolbar)
})
