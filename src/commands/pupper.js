exports.run = getDogPic

async function getDogPic (Memer, msg) {
  const data = await Memer._snek.get('https://random.dog/woof.json')

  msg.channel.createMessage({
    embed: {
      title: '🐶',
      color: 0x59BEE8,
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
