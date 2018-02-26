exports.run = getBirbPic

async function getBirbPic (Memer, msg) {
  const data = await Memer._snek.get('https://random.birb.pw/tweet/')

  msg.channel.createMessage({
    embed: {
      title: '🐦',
      color: 0x59BEE8,
      image: { url: `https://random.birb.pw/img/${data.text}` },
      footer: { text: `Requested by ${msg.author.username}#${msg.author.discriminator}` }
    }
  })
}

exports.props = {
  name: 'birb',
  usage: '{command}',
  aliases: ['bird'],
  cooldown: 1000,
  description: 'See some cute birbs!',
  perms: ['embedLinks']
}
