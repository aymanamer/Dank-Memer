exports.run = function (_, msg) {
  msg.channel.createMessage('( ͡° ͜ʖ ͡° )')
}

exports.props = {
  name: 'lenny',
  usage: '{command}',
  aliases: [],
  cooldown: 1000,
  description: '( ͡° ͜ʖ ͡° )',
  perms: []
}
