const { GenericImageCommand } = require('../../models/')

module.exports = new GenericImageCommand({
  triggers: ['rip'],
  description: 'rest in pepperonis'
})
