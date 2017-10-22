const GenericImageCommand = require('../models/GenericImageCommand.js')

const command = new GenericImageCommand('delete', null, {
  aliases: ['delet'],
  description: 'delet this.'
})

module.exports = command
