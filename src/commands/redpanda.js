const { redpandas } = require('../assets/animals.json')
exports.run = getDogPic

async function getDogPic (Memer, msg) {

  msg.channel.createMessage({
    embed: {
      title: 'dawwwwwwww',
      color: Memer.randomColor(),
      image: { url: Memer.randomInArray(redpandas) },
      footer: { text: `Requested by ${msg.author.username}#${msg.author.discriminator}` }
    }
  })
}

exports.props = {
  name: 'redpanda',
  usage: '{command}',
  aliases: ['redboi'],
  cooldown: 1000,
  description: 'See some cute red pandas!',
  perms: ['embedLinks']
}
