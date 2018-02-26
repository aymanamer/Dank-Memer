exports.run = getDogPic

async function getDogPic (Memer, msg) {
  const data = await Memer._snek.get('https://boob.bot/api/v2/img/ass', {headers: {Key: Memer.config.porn}})

  msg.channel.createMessage({
    embed: {
      title: 'Here, take some booty.',
      color: Memer.randomColor(),
      image: { url: data.body.url },
      footer: { text: 'Free nudes thanks to boobbot & tom <3' }
    }
  })
}

exports.props = {
  name: 'booty',
  usage: '{command}',
  aliases: ['ass'],
  cooldown: 1000,
  description: 'See some cute ass!',
  perms: ['embedLinks'],
  isNSFW: true
}
