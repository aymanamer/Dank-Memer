const { GenericImageCommand } = require('../../models/')

module.exports = new GenericImageCommand({
  triggers: ['egg', 'birth'],
  description: 'There is no reason for this command, but here you go.'
})
