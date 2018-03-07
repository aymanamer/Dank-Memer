const { GenericImageCommand } = require('../../models/')

module.exports = new GenericImageCommand({
  triggers: ['warp'],
  description: 'Warp some image shit'
})
