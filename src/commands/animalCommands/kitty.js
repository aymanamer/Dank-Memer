const { GenericMediaCommand } = require('../../models/')

module.exports = new GenericMediaCommand({
  triggers: ['kitty', 'pussy', 'cat', 'meow'],
  description: 'Lets see some pretty kitties!',

  title: '😻',
  reqURL: 'https://random.cat/meow',
  JSONKey: 'file'
})
