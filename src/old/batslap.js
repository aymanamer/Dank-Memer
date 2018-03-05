const { GenericImageCommand } = require('../models/')

module.exports = new GenericImageCommand({
  triggers: ['batslap', 'slap', 'batman'],
  description: 'Slap someone shitless with this.',

  doubleAvatar: true
})
