exports.run = async function (Memer, msg) {
  msg.channel.createMessage('See the most recent changes here: https://github.com/Dank-Memer/Dank-Memer/blob/master/changelog.txt')
}

exports.props = {
  name: 'changes',
  usage: '{command}',
  aliases: ['changelog'],
  cooldown: 1000,
  description: 'Come check out our update!',
  perms: ['embedLinks']
}
