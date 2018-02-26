exports.run = async function (Memer, msg, args) {
  if (!args[0]) {
    return msg.channel.createMessage('Hey, what do you want me to google?')
  }
  msg.channel.createMessage(`http://lmgtfy.com/?q=${args.join('+')}`)
}

exports.props = {
  name: 'google',
  usage: '{command} search terms',
  aliases: ['lmgtfy'],
  cooldown: 1000,
  description: 'Sick of someone asking dumb questions? LMGTFY it for them!',
  perms: []
}
