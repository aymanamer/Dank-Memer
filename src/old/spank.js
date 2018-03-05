const { GenericImageCommand } = require('../models/')

module.exports = new GenericImageCommand({
  triggers: ['spank', 'spanking'],
  description: 'Spank those naughty users',

  doubleAvatar: true
})
