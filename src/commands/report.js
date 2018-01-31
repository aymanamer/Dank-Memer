exports.run = function (Memer, msg, args) {
  if (!args[0]) {
    return msg.reply('`pls report @user for saying bad words in my christian server (or w/e they did bad)` Try again.')
  }

  try {
    Memer.bot.createMessage('397478484550746122', { embed: {
      title: 'New Report:',
      author: { name: `${msg.author.username}#${msg.author.discriminator} | ${msg.author.id}` },
      description: args.join(' '),
      fields: [{ name: 'Sent from:', value: `#${msg.channel.name} in ${msg.channel.guild.name}` }],
      color: '16711680',
      footer: { text: `Guild ID: ${msg.channel.guild.id}` },
      timestamp: new Date()
    }

    })
    msg.channel.createMessage('Sent your report to the proper authorites 👮 😩 ✋')
  } catch (e) {
    Memer.log(e.stack, 'error')
  }
}

exports.props = {
  name: 'report',
  usage: '{command} who you are reporting, and what for',
  aliases: ['bother', 'message'],
  cooldown: 5000,
  description: 'Send feedback to the developers',
  perms: ['embedLinks']
}
