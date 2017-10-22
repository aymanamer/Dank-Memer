const GenericImageCommand = require('../models/GenericImageCommand.js')

const command = new GenericImageCommand('cancer', null, {
  aliases: ['cancerous'],
  description: 'the picture doesn\'t lie...'
})

module.exports = command
