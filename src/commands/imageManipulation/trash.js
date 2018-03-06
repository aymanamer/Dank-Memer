const { GenericImageCommand } = require('../../models/')

module.exports = new GenericImageCommand({
  triggers: ['trash', 'garbage'],
  description: 'lol ur trash'
})
