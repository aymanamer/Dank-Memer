const { GenericImageCommand } = require('../../models/')

module.exports = new GenericImageCommand({
  triggers: ['jail', 'prison'],
  description: 'Send your friends to jail!'
})
