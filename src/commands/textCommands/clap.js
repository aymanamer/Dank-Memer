const { GenericCommand } = require('../../models/')

module.exports = new GenericCommand(
  async ({ args }) => args.join(' 👏 '),
  {
    triggers: ['clap'],
    description: 'Make the bot say whatever you want with sass!',
    usage: '{command} <what you want the bot to say>',

    missingArgs: 'What do you want me to say?'
  }
)
