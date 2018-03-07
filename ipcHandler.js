exports.processIncomingMessage = async (type, data) => {
  switch (type) {
    case 'print':
      console.info(data)
      break
    // You can put anything here to match "type", e.g. "reload" - and reload commands accordingly.
  }
}
