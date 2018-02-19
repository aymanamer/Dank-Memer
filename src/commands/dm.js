exports.run = async function (Memer, msg, args) {
  if (!Memer.config.devs.includes(msg.author.id)) {
    return  msg.channel.createMessage(`**LMAO** *you don't look like one of my developers...*`)
  }
  try {
    const channel = await Memer.bot.getDMChannel(args[0])
    channel.createMessage({ embed: {
      color: Memer.colors.purple,
      title: '📫 You have received a message from the developers!',
      description: args.slice(1).join(' '),
      footer: { text: 'To reply, please use pls vent.' }
    }})
    await msg.addReaction('📧')
  } catch (e) {
    await msg.addReaction('❌')
    msg.channel.createMessage(`**Fuck!** *${e.message}*`)
  }
}

exports.props = {
  name: 'dm',
  usage: '{command} <id> <shit>',
  aliases: ['slideintothedms'],
  cooldown: 1,
  description: 'aether stinks',
  perms: []
}
