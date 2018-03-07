const { GenericImageCommand } = require('../../models/')

module.exports = new GenericImageCommand({
  triggers: ['cry', 'tears', 'water'],
  usage: '{command} <something to make blue guy cry>',
  description: 'Leik dis if you crye evertim',

  requiredArgs: 'You need to add something to make blue dude cry, try again.',
  textLimit: 250,
  textOnly: true
})
