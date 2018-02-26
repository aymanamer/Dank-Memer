exports.run = async function (Memer, msg) {
  const res = await Memer._snek.get('https://api.weeb.sh/images/random?type=discord_memes', {headers: {Authorization: Memer.config.weeb}})

  await msg.channel.createMessage({ embed: {
    title: `Random Discord Meme`,
    color: Memer.randomColor(),
    image: { url: res.body.url },
    footer: { text: `powered by weeb shit (weeb.sh)` }
  }})
}

exports.props = {
  name: 'discordmeme',
  usage: '{command}',
  aliases: ['dscmeme', 'discord'],
  cooldown: 1000,
  description: 'A random Discord-themed meme!',
  perms: ['embedLinks']
}
