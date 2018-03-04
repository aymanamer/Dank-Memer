const { GenericRedditCommand } = require('../models')

module.exports = new GenericRedditCommand({
  triggers: ['showerthoughts'],
  description: 'Things to thing about in the shower',

  endpoint: '/r/showerthoughts/top/.json?sort=top&t=day&limit=400',
  type: 'text'
})
