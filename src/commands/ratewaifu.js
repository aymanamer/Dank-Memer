const { GenericCommand } = require('../models/')

module.exports = new GenericCommand(
  async ({ msg, args }) => {
    let target = !args[0] || args[0].toLowerCase() === 'me'
      ? 'You are'
      : (
        msg.mentions[0]
          ? `${msg.mentions[0].nick || msg.mentions[0].username} is a`
          : `${args.join(' ')} is a`
      )

    return `${target} ${Math.floor(Math.random() * 10 + 1)}/10 waifu 😄`
  }, {
    triggers: ['ratewaifu', 'waifu'],
    description: 'People were upset about only being rated as dank or not, so we added this. You\'re welcome princess'
  }
)
