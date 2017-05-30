const Feature = require('./feature').Feature

module.exports = {
  autoAssign: new Feature('autoAssign', {
    enabled: false,
    firstName: '',
    lastName: ''
  })
}
