const { GenericRedditCommand } = require('../../models/')

module.exports = new GenericRedditCommand({
  triggers: ['shitpost', 'copypasta'],
  description: 'See the top copypastas on reddit!',

  endpoint: '/r/copypasta/top/.json?sort=top&t=week&limit=500',
  type: 'text'
})
