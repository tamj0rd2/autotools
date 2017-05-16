let autoAssignTicket = () => {
  let selectPrimaryResource = () => {
    // select the currentUser as the primary resource
    let currentUser = 'Jordan, Tamara'
    let resourceDdlId = 'ucResourceAssignment_ddlResource_ATDropDown'
    let resourceDdl = document.getElementById(resourceDdlId)
    let currentUserVal = $(resourceDdl).find(`[title='${currentUser}']`).val()
    $(resourceDdl).val(currentUserVal)

    // for some reason, triggering change using jquery doesn't work in chrome
    resourceDdl.dispatchEvent(new Event('change'))
  }

  let selectResourceRole = () => {
    // wait for the list of roles to populate before selecting a role
    let $roleSelect = $('#ucResourceAssignment_ddlRole_ATDropDown')
    let $roles = $($roleSelect).find('option')
    $($roleSelect).prop('selectedIndex', $roles.length - 1)
    $($roleSelect).trigger('change')
  }

  selectPrimaryResource()
  // wait for the list of roles to populate before selecting a role
  setTimeout(selectResourceRole, 500)
}

module.exports = () => {
  autoAssignTicket()
}
