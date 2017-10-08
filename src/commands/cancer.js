const Jimp = require('jimp')

exports.run = async function (Memer, msg, args) {
  let avatarurl = msg.mentions.length > 0 ? msg.mentions[0].staticAvatarURL : msg.author.staticAvatarURL
  if (['jpg', 'jpeg', 'gif', 'png', 'webp'].some(x => args.join(' ').includes(x))) {
    avatarurl = args.join(' ').replace(/gif|webp/g, 'png')
  }

  const bad = await Jimp.read(avatarurl)
  const template = await Jimp.read('./assets/imgen/cancer.png')

  bad.resize(100, 100)

  template.composite(bad, 351, 200)
  template.getBuffer(Jimp.MIME_PNG, async (err, buffer) => {
    if (err) {
      return msg.channel.createMessage(`Error: ${err.message}`)
    }
    await msg.channel.createMessage('', {
      file: buffer, name: 'cancer.png'
    })
  })
}

exports.props = {
  name: 'cancer',
  usage: '{command}',
  aliases: ['cancerous'],
  cooldown: 3000,
  description: 'the picture doesn\'t lie...'
}
