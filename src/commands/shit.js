const Jimp = require('jimp')

exports.run = async function (Memer, msg, args) {
  if (msg.mentions[0]) {
    args = msg.mentions[0].username
  } else {
    if (args < 1) {
      args = msg.author.username
    } else if (args.join(' ').length > 35) {
      return msg.channel.createMessage(`This shit was too large. You're ${args.join(' ').length - 35} characters over the limit!`)
    } else {
      args = args.join(' ')
    }
  }

  const text = args
  const mom = await Jimp.read('./assets/imgen/shit.jpg')
  const blank = await Jimp.read('./assets/imgen/Empty.png')

  const font = await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK)

  blank.resize(350, 350)
  const search = blank.print(font, 0, 0, text, 350)
  search.rotate(310)

  mom.composite(search, 195, 585)
  mom.getBuffer(Jimp.MIME_PNG, async (err, buffer) => {
    if (err) {
      msg.channel.createMessage(`Error: ${err.message}`)
    }
    await msg.channel.createMessage('', {
      file: buffer, name: 'shit.png'
    })
  })
}

exports.props = {
  name: 'shit',
  usage: '{command}',
  aliases: ['shitty'],
  cooldown: 3000,
  description: 'The shit on my shoe!',
  perms: ['attachFiles']
}
