const { roast } = require('../assets/arrays.json')
const { GenericCommand } = require('../models/')

module.exports = new GenericCommand(
  async ({ Memer, msg, addCD }) => Memer.randomInArray(roast)
    .replace(/\$mention/g, (msg.mentions[0] || msg.author).username)
    .replace(/\$author/g, msg.author.username),
  {
    triggers: ['roast', 'rekt'],
    usage: '{command} @user',
    description: 'Sick of someone? Easy! Just roast them!'
  }
)
