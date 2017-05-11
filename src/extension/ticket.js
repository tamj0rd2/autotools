let ticketUrls = {
  new: 'https://ww16.autotask.net/autotask/views/ServiceDesk/ServiceDeskTicket/service_ticket_new.aspx',
  existing: 'https://ww16.autotask.net/autotask/views/ServiceDesk/ServiceDeskTicket/service_ticket.aspx'
}

// we have to inject this code, since chrome extensions can't access
// the real window variable and thus can't access the ticket's mode
let codeToInject = `
<script type="text/javascript">
  var atTicketEvent = new CustomEvent(
    'ATTicketEvent',
    {detail: window.serviceTicket._mode}
  );
  document.head.dispatchEvent(atTicketEvent);
</script>
`

// apply a script depending on whether it's being edited or viewed
let routeExistingTicket = () => {
  $(document.head).on('ATTicketEvent', e => {
    let ticketMode = e.detail

    if (ticketMode === 0) {
      console.log('Do view ticket things')
    } else if (ticketMode === 1) {
      console.log('Do edit ticket things')
    }
  })

  // wait until load finishes, otherwise window.serviceTicket
  // won't have been defined yet
  $('#bodyIframe').on('load', () => {
    $(document.head).append(codeToInject)
  })
}

if (RegExp(ticketUrls.new, 'g').test(location.href)) {
  console.log('Do new ticket things')
} else if (RegExp(ticketUrls.existing, 'g').test(location.href)) {
  routeExistingTicket()
}
