const GenericImageCommand = require('../models/GenericImageCommand.js')

const command = new GenericImageCommand('ban', null, {
  aliases: ['banne'],
  description: 'ban this nerd pls'
})

module.exports = command
