const { GenericImageCommand } = require('../models/')

module.exports = new GenericImageCommand({
  triggers: ['byemom', 'bye'],
  usage: '{command} <something to google search>',
  description: 'Quick, mom is gone, what are you gonna search on google?',

  requiredArgs: 'You need to add something to search on google, try again.',
  textLimit: 140
})
