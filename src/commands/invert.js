const GenericImageCommand = require('../models/GenericImageCommand.js')

const command = new GenericImageCommand('invert', null, {
  usage: '{command} @user',
  description: 'Invert your image!'
})

module.exports = command
