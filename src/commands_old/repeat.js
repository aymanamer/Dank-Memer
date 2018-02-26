exports.run = async function (Memer, msg, args) {
  if (!args[0]) {
    msg.channel.createMessage('What do you want me to say?')
  } else {
    msg.channel.createMessage(args.join(' '))
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
