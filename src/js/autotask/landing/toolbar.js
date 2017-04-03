/*
 * Add toolbar with 1-click shortcuts
 */

require('../../../css/shortcuts.scss')

$(document).ready(() => {
  let $toolbar = $('<div>', {
    id: 'AT3Toolbar',
    class: 'ButtonGroup'
  })

  // the props for each button goes in this array
  let btns = [
    {
      text: 'Tickets',
      url: '/serviceDesk/MyQueues.asp?isFromMyWorkspaceAndQueues=1'
    },
    {
      text: 'Timesheet',
      url: '/home/timeEntry/wrkEntryFrames.asp'
    },
    {
      text: 'Dispatcher',
      url: '/Autotask/Views/DispatcherWorkshop/DispatcherWorkshopContainer.aspx'
    }
  ]

  // get a reference to the main frame
  let frame = $('#PageContainerFrame')

  // create and add each button to the toolbar
  btns.forEach(btnObj => {
    let $btn = $('<button>', {
      class: 'AT3ToolbarBtn',
      text: btnObj.text,
      click () {
        $(frame).attr('src', btnObj.url)
        $('#PageContainer').attr('class', 'Active')
        $('#DashboardContainer').removeAttr('class')
      }
    })
    $($toolbar).append($btn)
  })

  // add the toolbar to the DOM
  $('#SiteNavigationBar').append($toolbar)
})
