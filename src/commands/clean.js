exports.run = async function (Memer, msg, args) {
  let messages = await msg.channel.getMessages(100)
  messages = messages.filter(m => m.author.id === Memer.bot.user.id && m.timestamp > Date.now() - 14 * 24 * 60 * 60 * 1000)
  messages.length = parseInt(args[0]) || 10
  if (messages[0]) {
    msg.channel.deleteMessages(messages.map(m => m.id))
      .catch(() => {})
  }
}

exports.props = {
  name: 'clean',
  usage: '{command}',
  aliases: ['purge'],
  cooldown: 2000,
  description: 'Will quickly clean the last 10 messages, or however many you specify.',
  perms: ['manageMessages', 'readMessageHistory']
}
