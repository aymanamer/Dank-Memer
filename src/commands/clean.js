const { GenericCommand } = require('../models/')

module.exports = new GenericCommand(
  async ({ Memer, msg, args, addCD }) => {
    let messages = await msg.channel.getMessages(100)
    messages = messages.filter(m => m.author.id === Memer.bot.user.id && m.timestamp > Date.now() - 14 * 24 * 60 * 60 * 1000)
    messages.length = parseInt(args[0]) || 10
    if (messages[0]) {
      await addCD()
      msg.channel.deleteMessages(messages.map(m => m.id))
        .catch(() => {})
    }
  }, {
    triggers: ['clean', 'purge'],
    cooldown: 5000,
    description: 'Will quickly clean the last 10 messages, or however many you specify.',
    perms: ['manageMessages', 'readMessageHistory']
  }
)
