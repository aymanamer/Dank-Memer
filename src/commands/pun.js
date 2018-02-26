const { GenericCommand } = require('../models/')
const { get } = require('snekfetch')

module.exports = new GenericCommand(
  () => get('https://icanhazdadjoke.com/')
    .set('Accept', 'application/json')
    .then(r => r.body.joke),
  {
    triggers: ['pun', 'dadjoke'],
    description: 'Are they dad jokes, or are they puns? Is there even a difference?'
  }
)
