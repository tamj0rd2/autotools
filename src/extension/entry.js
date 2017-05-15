var R = require('ramda')

if (R.test(/Navigation.mvc\/Landing\/?$/, location.href)) {
  require('./landing.js')
} else if (R.test(/service_ticket(_new)?.aspx/, location.href)) {
  require('./ticket.js')
}
