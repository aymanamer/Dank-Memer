const GenericImageCommand = require('../models/GenericImageCommand.js')

const command = new GenericImageCommand('hitler', null, {
  aliases: ['worsethanhitler'],
  description: 'It\'s not offensive if it\'s true, so use this wisely.'
})

module.exports = command
