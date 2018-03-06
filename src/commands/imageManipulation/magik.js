const { GenericImageCommand } = require('../../models/')

module.exports = new GenericImageCommand({
  triggers: ['magik', 'squiggle'],
  description: 'Make something magik!',

  reqURL: 'https://discord.services/api/magik?url=$URL'
})
