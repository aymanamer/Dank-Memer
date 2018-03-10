const { GenericImageCommand } = require('../../models/')

module.exports = new GenericImageCommand({
  triggers: ['b1nzy', 'catman'],
  usage: '{command} <something to make b1nzy say>',
  description: 'OH NO ITS B1NZY',

  requiredArgs: 'You need to add something to make b1nzy say, try again.',
  textLimit: 250,
  textOnly: true
})
