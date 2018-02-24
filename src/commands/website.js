exports.run = async function (Memer, msg) {
  msg.channel.createMessage('http://dankmemer.lol/')
}

exports.props = {
  name: 'website',
  usage: '{command}',
  aliases: ['site'],
  cooldown: 1000,
  description: 'Come check out our website!',
  perms: ['embedLinks']
}
