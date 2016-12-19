/*
 * Add toolbar with 1-click shortcuts
 */

require('../../../css/shortcuts.scss')

$(document).ready(() => {
  // Creates a button group to hold the buttons
  var newBtnGroup = document.createElement('div')
  newBtnGroup.className = 'ButtonGroup'

  // Creates a division to hold the button group
  var newDiv = document.createElement('div')
  newDiv.className = 'TamDiv1'
    // adds button group to the actual division
  newDiv.appendChild(newBtnGroup)

  // creates reference to last member of the navbar
  var navRef = document.getElementById('SiteNavigationBarRight')
  // adds the division to the navbar
  navRef.parentNode.insertBefore(newDiv, navRef.nextSibling)

  // creates references to frames and page containers we may need
  var dashboardContainer = document.getElementById('DashboardContainer')
  var pageContainer = document.getElementById('PageContainer')
  var iframe = document.getElementById('PageContainerFrame')

  // function to add shortcut buttons to the page
  function createShortcut (btnId, group, btnText, newSrc) {
    var newBtn = document.createElement('button')
    newBtn.className = 'TamButton'
    newBtn.id = btnId
    newBtn.textContent = btnText
    newBtn.onclick = function () {
      iframe.src = newSrc
      if (pageContainer.className !== 'Active') {
        pageContainer.className = 'Active'
        dashboardContainer.className = ''
      }
    }
    group.appendChild(newBtn)
  }

  // creates variables for useful views
  var ticketsView = '/serviceDesk/MyQueues.asp?isFromMyWorkspaceAndQueues=1'
  var timesheetView = '/home/timeEntry/wrkEntryFrames.asp'
  var dispatcherView = '/Autotask/Views/DispatcherWorkshop/DispatcherWorkshopContainer.aspx'

  // adds shortcuts to the page
  createShortcut('TQueueSC', newBtnGroup, 'Tickets', ticketsView)
  createShortcut('TTimesheetSC', newBtnGroup, 'Timesheet', timesheetView)
  createShortcut('TDispatcherSC', newBtnGroup, 'Dispatcher', dispatcherView)
})
