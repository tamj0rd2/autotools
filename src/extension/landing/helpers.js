let urls = {
  toolbar: {
    'Tickets': '/serviceDesk/MyQueues.asp?isFromMyWorkspaceAndQueues=1',
    'Timesheet': '/home/timeEntry/wrkEntryFrames.asp',
    'Dispatcher': '/Autotask/Views/DispatcherWorkshop/DispatcherWorkshopContainer.aspx'
  }
}

function loadAPage (frame, url) {
  $(frame).attr('src', url)
  $('#PageContainer').attr('class', 'Active')
  $('#DashboardContainer').removeAttr('class')
}

module.exports = {
  loadAPage,
  urls
}
