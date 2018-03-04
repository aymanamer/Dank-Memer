const { GenericRedditCommand } = require('../models')

module.exports = new GenericRedditCommand({
  triggers: ['aww', 'cute'],
  description: 'See some random cute things',

  endpoint: '/r/aww/top/.json?sort=top&t=day&limit=100',
  type: 'image'
})
