const GenericImageCommand = require('../models/GenericImageCommand.js')

const command = new GenericImageCommand('rip', null, {
  description: 'rest in pepperonis'
})

module.exports = command
