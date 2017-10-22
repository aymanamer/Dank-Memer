const GenericImageCommand = require('../models/GenericImageCommand.js')

const command = new GenericImageCommand('trigger', null, {
  aliases: ['triggered'],
  description: 'UR SO TRIGGERED BRO'
})

module.exports = command
