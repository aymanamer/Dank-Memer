const { GenericRedditCommand } = require('../../models')

module.exports = new GenericRedditCommand({
  triggers: ['facepalm', 'smh'],
  description: 'Images that make you facepalm',

  endpoint: '/r/facepalm/top/.json?sort=top&t=week&limit=100',
  type: 'image'
})
