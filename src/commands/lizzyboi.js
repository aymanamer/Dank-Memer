exports.run = getDogPic

async function getDogPic (Memer, msg) {
  const data = await Memer._snek.get('https://testy.nekos.life/api/v2/img/lizard')
  if (data.body.url.includes('.mp4')) {
    return getDogPic(Memer, msg)
  }

  msg.channel.createMessage({
    embed: {
      title: '🦎',
      color: parseInt('59BEE8', 16),
      image: { url: data.body.url },
      footer: { text: `Requested by ${msg.author.username}#${msg.author.discriminator}` }
    }
  })
}

exports.props = {
  name: 'lizzyboi',
  usage: '{command}',
  aliases: ['lizard'],
  cooldown: 1000,
  description: 'See some cute lizzybois!',
  perms: ['embedLinks']
}
