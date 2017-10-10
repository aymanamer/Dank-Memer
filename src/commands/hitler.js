const Jimp = require('jimp')

exports.run = async function (Memer, msg, args) {
  let avatarurl = msg.mentions.length > 0 ? msg.mentions[0].staticAvatarURL : msg.author.staticAvatarURL
  if (['jpg', 'jpeg', 'gif', 'png', 'webp'].some(x => args.join(' ').includes(x))) {
    avatarurl = args.join(' ').replace(/gif|webp/g, 'png')
  }

  const hitler = await Jimp.read(avatarurl)
  const template = await Jimp.read('./assets/imgen/hitler.jpeg')

  hitler.resize(141, 140)

  template.composite(hitler, 46, 43)
  template.getBuffer(Jimp.MIME_PNG, async (err, buffer) => {
    if (err) {
      msg.channel.createMessage(`Error: ${err.message}`)
    }
    await msg.channel.createMessage('', {
      file: buffer, name: 'hitler.png'
    })
  })
}

exports.props = {
  name: 'hitler',
  usage: '{command}',
  aliases: ['worsethanhitler'],
  cooldown: 3000,
  description: 'It\'s not offensive if it\'s true, so use this wisely.',
  perms: ['attachFiles']
}
