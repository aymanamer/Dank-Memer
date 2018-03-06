const { GenericImageCommand } = require('../../models/')

module.exports = new GenericImageCommand({
  triggers: ['ban', 'banne'],
  description: 'ban this nerd pls'
})
