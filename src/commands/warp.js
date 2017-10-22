const GenericImageCommand = require('../models/GenericImageCommand.js')

const command = new GenericImageCommand('warp', null, {
  description: 'Warp some image shit'
})

module.exports = command
