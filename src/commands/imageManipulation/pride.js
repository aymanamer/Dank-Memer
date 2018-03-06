const { GenericImageCommand } = require('../../models/')

module.exports = new GenericImageCommand({
  triggers: ['pride', 'gaypride'],
  description: 'Show your gay pride!'
})
