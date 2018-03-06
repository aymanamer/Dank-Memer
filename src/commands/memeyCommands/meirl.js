const { GenericRedditCommand } = require('../../models')

module.exports = new GenericRedditCommand({
  triggers: ['meirl', 'me_irl'],
  description: 'same tbh',

  endpoint: '/r/me_irl/top/.json?sort=top&t=daily&limit=100',
  type: 'image'
})
