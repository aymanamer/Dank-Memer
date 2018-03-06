const { GenericImageCommand } = require('../../models/')

module.exports = new GenericImageCommand({
  triggers: ['delete', 'delet'],
  description: 'delet this.'
})
