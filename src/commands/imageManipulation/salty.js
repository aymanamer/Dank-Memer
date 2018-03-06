const { GenericImageCommand } = require('../../models/')

module.exports = new GenericImageCommand({
  triggers: ['salty', 'salt'],
  description: 'You seem salty to me, let me show you.',

  format: 'gif'
})
