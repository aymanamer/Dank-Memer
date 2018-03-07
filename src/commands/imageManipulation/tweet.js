const { GenericImageCommand } = require('../../models/')

module.exports = new GenericImageCommand({
  triggers: ['tweet', 'trump'],
  description: 'dear lord, what is trump saying now...',
  usage: '{command} <something to make trump say>',

  requiredArgs: 'You need to add something to make trump tweet, try again.',
  textLimit: 140,
  textOnly: true
})
