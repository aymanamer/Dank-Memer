const { GenericRedditCommand } = require('../../models')

module.exports = new GenericRedditCommand({
  triggers: ['tifu', 'fuckedup'],
  description: 'You really fucked up this time',

  endpoint: '/r/tifu/top/.json?sort=top&t=day&limit=400',
  type: 'text'
})
