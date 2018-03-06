const { GenericRedditCommand } = require('../../models')

module.exports = new GenericRedditCommand({
  triggers: ['greentext', 'gt'],
  description: '>sending greentexts',

  endpoint: '/r/greentext/top/.json?sort=top&t=day&limit=400',
  type: 'image'
})
