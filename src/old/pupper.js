const { GenericMediaCommand } = require('../models/')

module.exports = new GenericMediaCommand({
  triggers: ['pupper', 'doggo', 'dog', 'yipper'],
  description: 'See some cute doggos!',

  title: '🐶',
  reqURL: 'https://random.dog/woof.json',
  JSONKey: 'url'
})
