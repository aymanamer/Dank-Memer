exports.run = getDogPic

async function getDogPic (Memer, msg) {
  const data = await Memer._snek.get('https://boob.bot/api/v2/img/Gifs', {headers: {Key: Memer.config.porn}})

  msg.channel.createMessage({
    embed: {
      title: 'Here, take some gifs ;)',
      color: Memer.randomColor(),
      image: { url: data.body.url },
      footer: { text: 'Free nudes thanks to boobbot & tom <3' }
    }
  })
}

exports.props = {
  name: 'porngif',
  usage: '{command}',
  aliases: ['gifs', 'porn'],
  cooldown: 1000,
  description: 'Basically a porn video but with gifs',
  perms: ['embedLinks'],
  isNSFW: true
}
