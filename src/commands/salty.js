const GenericImageCommand = require('../models/GenericImageCommand.js')

const command = new GenericImageCommand('salty', null, {
  aliases: ['salt'],
  format: 'gif',
  description: 'You seem salty to me, let me show you.'
})

module.exports = command
