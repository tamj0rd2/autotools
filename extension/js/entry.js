var R = require('ramda')

if (R.test(/html\/popup.html\/?$/, location.href)) {
  require('./popup/popup.js')
} else if (R.test(/Navigation.mvc\/Landing\/?$/, location.href)) {
  require('./autotask/landing.js')
} else if (R.test(/service_ticket(_new)?.aspx/, location.href)) {
  require('./autotask/ticket.js')
}
