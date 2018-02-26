const GenericImageCommand = require('../models/GenericImageCommand.js')

const command = new GenericImageCommand('pride', null, {
  aliases: ['gay'],
  description: 'Show your gay pride!'
})

module.exports = command
