const Jimp = require('jimp')

exports.run = async function (Memer, msg, args) {
  let avatarurl = msg.mentions.length > 0 ? msg.mentions[0].staticAvatarURL : msg.author.staticAvatarURL
  if (['jpg', 'jpeg', 'gif', 'png', 'webp'].some(x => args.join(' ').includes(x))) {
    avatarurl = args.join(' ').replace(/gif|webp/g, 'png')
  }

  const garbage = await Jimp.read(avatarurl)
  const template = await Jimp.read('./assets/imgen/delete.png')

  garbage.resize(195, 195)

  template.composite(garbage, 120, 135)
  template.getBuffer(Jimp.MIME_PNG, async (err, buffer) => {
    if (err) {
      return msg.channel.createMessage(`Error: ${err.message}`)
    }
    await msg.channel.createMessage('', {
      file: buffer, name: 'delete.png'
    })
  })
}

exports.props = {
  name: 'delete',
  usage: '{command}',
  aliases: ['delet'],
  cooldown: 3000,
  description: 'delet this.',
  perms: ['attachfiles']
}
