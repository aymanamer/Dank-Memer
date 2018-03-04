const { kill } = require('../assets/arrays.json')
const { GenericCommand } = require('../models/')

module.exports = new GenericCommand(
  async ({ Memer, msg, args, addCD }) => {
    if (args[0] === 'me' || msg.mentions[0].id === msg.author.id) {
      return ' Ok you\'re dead. Please tag someone else to kill.'
    }
    if (!msg.mentions[0]) {
      return 'Please tag someone to kill.'
    }

    return Memer.randomInArray(kill)
      .replace(/\$mention/g, msg.mentions[0].username)
      .replace(/\$author/g, msg.author.username)
  }, {
    triggers: ['kill', 'murder'],
    usage: '{command} @user',
    description: 'Sick of someone? Easy! Just kill them!'
  }
)
