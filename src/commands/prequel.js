const { GenericRedditCommand } = require('../models')

module.exports = new GenericRedditCommand({
  triggers: ['prequel', 'pmeme'],
  description: 'The force is NOT with these',

  endpoint: '/r/PrequelMemes/top/.json?sort=top&t=day&limit=100',
  type: 'image'
})
