const { GenericImageCommand } = require('../models/')

module.exports = new GenericImageCommand({
  triggers: ['hitler', 'worsethanhitler'],
  description: 'It\'s not offensive if it\'s true, so use this wisely.'
})
