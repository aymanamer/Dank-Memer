exports.run = async function (Memer, msg) {
  getDogPic(Memer, msg)
}

async function getDogPic (Memer, msg) {
  const data = await Memer._snek.get('https://random.dog/woof.json')
  if (data.body.url.includes('.mp4')) {
    return getDogPic(Memer, msg)
  }

  msg.channel.createMessage({
    embed: {
      title: '🐶',
      color: parseInt('59BEE8', 16),
      image: { url: data.body.url },
      footer: { text: `Requested by ${msg.author.username}#${msg.author.discriminator}` }
    }
  })
}

exports.props = {
  name: 'pupper',
  usage: '{command}',
  aliases: ['doggo', 'yipper'],
  cooldown: 1000,
  description: 'See some cute doggos!',
  perms: ['embedLinks']
}
