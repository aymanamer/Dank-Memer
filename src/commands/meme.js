const { GenericRedditCommand } = require('../models')

module.exports = new GenericRedditCommand({
  triggers: ['meme', 'maymay'],
  description: 'See the top new memes on reddit!',

  endpoint: '/u/kerdaloo/m/dankmemer/top/.json?sort=top&t=day&limit=500',
  type: 'image'
})
