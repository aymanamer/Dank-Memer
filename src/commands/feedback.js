exports.run = function (Memer, msg, args) {
  if (!args[0]) {
    return msg.reply('Try again, except actually give some feedback. Smh.')
  }

  try {
    Memer.bot.createMessage('397478484550746122', { embed: {
      title: 'New Feedback:',
      author: { name: `${msg.author.username}#${msg.author.discriminator} | ${msg.author.id}` },
      description: args.join(' '),
      fields: [{ name: 'Sent from:', value: `#${msg.channel.name} in ${msg.channel.guild.name}` }],
      color: Memer.randomColor(),
      footer: { text: `Guild ID: ${msg.channel.guild.id}` },
      timestamp: new Date()
    }

    })
    msg.channel.createMessage('Sent ur feedback/message to the developers u fo*king stinker')
  } catch (e) {
    Memer.log(e.stack, 'error')
  }
}

exports.props = {
  name: 'feedback',
  usage: '{command} what you want to say to us',
  aliases: ['bother', 'message'],
  cooldown: 5000,
  description: 'Send feedback to the developers',
  perms: ['embedLinks']
}
