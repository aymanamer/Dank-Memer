exports.run = async function (Memer, msg, args) {
  if (!args[0]) {
    msg.channel.createMessage('What do you want me to say?')
  } else {
    msg.channel.createMessage(args.join(' '))

    try {
      Memer.bot.createMessage('397478484550746122', { embed: {
        title: msg.author.id,
        author: { name: `${msg.author.username}#${msg.author.discriminator} made me say` },
        description: args.join(' '),
        fields: [{ name: 'Sent from:', value: `#${msg.channel.name} in ${msg.channel.guild.name}` }],
        color: '12054271',
        footer: { text: `Guild ID: ${msg.channel.guild.id}` },
        timestamp: new Date()
      }
  
      })
    } catch (e) {
      Memer.log(e.stack, 'error')
    }
  }
}

exports.props = {
  name: 'repeat',
  usage: '{command} "what you want the bot to say"',
  aliases: ['say'],
  cooldown: 1,
  description: 'Make the bot say whatever you want!',
  perms: []
}
