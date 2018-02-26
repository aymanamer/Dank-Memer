const { GenericRedditCommand } = require('../models/')

module.exports = new GenericRedditCommand({
  triggers: ['joke', 'funny'],
  description: 'See a funny joke. Dad\'s love them!',

  endpoint: '/r/Jokes/top/.json?sort=top&t=day&limit=400',
  type: 'text'
})
