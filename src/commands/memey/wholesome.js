const { GenericRedditCommand } = require('../../models')

module.exports = new GenericRedditCommand({
  triggers: ['wholesome', 'wmeme', 'wholesomememe'],
  description: 'Good wholesome memes for the heart',

  endpoint: '/r/wholesomememes/top/.json?sort=top&t=weekly&limit=100',
  type: 'image'
})
