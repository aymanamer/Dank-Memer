const GenericImageCommand = require('../models/GenericImageCommand.js')

const command = new GenericImageCommand('jail', null, {
  description: 'Send your friends to jail!',
  aliases: ['prison']
})

module.exports = command
