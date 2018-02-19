const GenericImageCommand = require('../models/GenericImageCommand.js')

const command = new GenericImageCommand('egg', null, {
  aliases: ['birth'],
  description: 'There is no reason for this command, but here you go.'
})

module.exports = command
