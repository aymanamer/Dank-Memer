const Jimp = require('jimp')

exports.run = async function (Memer, msg, args) {
  let avatarurl = msg.mentions[0] ? msg.mentions[0].staticAvatarURL : msg.author.staticAvatarURL

  if (['jpg', 'jpeg', 'gif', 'png', 'webp'].some(x => args.join(' ').includes(x))) {
    avatarurl = args.join(' ').replace(/gif|webp/g, 'png')
  }
  const avatar = await Jimp.read(avatarurl)
  const bat = await Jimp.read('./assets/imgen/rip.png')

  avatar.resize(300, 300)
  bat.resize(642, 806)
  bat.composite(avatar, 175, 385)
  bat.getBuffer(Jimp.MIME_PNG, async (err, buffer) => {
    if (err) {
      msg.channel.createMessage(`Error: ${err.message}`)
    }
    await msg.channel.createMessage('', {
      file: buffer, name: 'rip.png'
    })
  })
}

exports.props = {
  name: 'rip',
  usage: '{command}',
  aliases: [],
  cooldown: 1,
  description: '',
  perms: ['embedLinks']
}
