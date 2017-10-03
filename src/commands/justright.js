const { right } = require('../assets/arrays.json')

exports.run = async function (Memer, msg) {
  const res = await Memer._snek.get(Memer.randomInArray(right))
  msg.channel.createMessage('', { file: res.body, name: 'justright.png' })
}

exports.props = {
  name: 'justright',
  usage: '{command}',
  aliases: ['okhand'],
  cooldown: 1000,
  description: 'Express how "just right" something is with this command.'
}
