const { roast } = require('../assets/arrays.json')

exports.run = async function (Memer, msg, args) {
  if (!msg.mentions[0]) {
    return msg.channel.createMessage(Memer.randomInArray(roast)
      .replace(/\$mention/g, msg.author.username)
      .replace(/\$author/g, msg.author.username))
  }
  msg.channel.createMessage(Memer.randomInArray(roast)
    .replace(/\$mention/g, msg.mentions[0].username)
    .replace(/\$author/g, msg.author.username))
}

exports.props = {
  name: 'roast',
  usage: '{command} @user',
  aliases: ['rekt'],
  cooldown: 1000,
  description: 'Sick of someone? Easy! Just roast them!',
  perms: []
}
