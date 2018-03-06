const { GenericImageCommand } = require('../../models/')

module.exports = new GenericImageCommand({
  triggers: ['cancer', 'cancerous'],
  description: 'the picture doesn\'t lie...'
})
