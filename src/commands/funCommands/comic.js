const { GenericRedditCommand } = require('../../models')

module.exports = new GenericRedditCommand({
  triggers: ['comics', 'comic'],
  description: 'See some s1ck new comics from the past week',

  endpoint: '/r/comics/top/.json?sort=top&t=week&limit=100',
  type: 'image'
})
