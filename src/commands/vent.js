exports.run = function (Memer, msg, args) {
  if (!args[0]) {
    return msg.reply('`pls vent "what you want to vent to me about"')
  }

  try {
    Memer.bot.createMessage('397478484550746122', { embed: {
      title: 'New Vent:',
      author: { name: `${msg.author.username}#${msg.author.discriminator} | ${msg.author.id}` },
      description: args.join(' '),
      fields: [{ name: 'Sent from:', value: `#${msg.channel.name} in ${msg.channel.guild.name}` }],
      color: Memer.randomColor(),
      footer: { text: `Guild ID: ${msg.channel.guild.id}` },
      timestamp: new Date()
    }
    })
    msg.channel.createMessage('Melmsie is listening to your venting now, what a great listener. amirite girls???? 😍')
  } catch (e) {
    Memer.log(e.stack, 'error')
  }
}

exports.props = {
  name: 'vent',
  usage: '{command} what to vent about',
  aliases: ['bother', 'message'],
  cooldown: 5000,
  description: 'I know I am your only friend, this should give you someone to vent to',
  perms: ['embedLinks']
}
