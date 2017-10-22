const GenericImageCommand = require('../models/GenericImageCommand.js')

const command = new GenericImageCommand('dank', null, {
  aliases: ['dankify', 'mlg'],
  format: 'gif',
  cooldown: 3000,
  description: 'mmmm doritos and hitmarkers. Classic.'
})

module.exports = command
