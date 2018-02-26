exports.run = async function (Memer, msg) {
  msg.channel.createMessage(`I rate you a ${Math.floor(Math.random() * 100 + 1)}/100 on the dank scale.`)
}

exports.props = {
  name: 'dankrate',
  usage: '{command}',
  aliases: ['rate'],
  cooldown: 1000,
  description: 'How dank are you?',
  perms: []
}
