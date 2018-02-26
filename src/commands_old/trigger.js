const GenericImageCommand = require('../models/GenericImageCommand.js')

const command = new GenericImageCommand('trigger', null, {
  aliases: ['triggered'],
  format: 'gif',
  description: 'UR SO TRIGGERED BRO'
})

module.exports = command
