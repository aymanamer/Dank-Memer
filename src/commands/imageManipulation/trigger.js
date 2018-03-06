const { GenericImageCommand } = require('../../models/')

module.exports = new GenericImageCommand({
  triggers: ['trigger', 'triggered'],
  description: 'UR SO TRIGGERED BRO',
  format: 'gif'
})
