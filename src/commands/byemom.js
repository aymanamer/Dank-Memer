exports.run = async function (Memer, msg, args) {
  const avatarurl = msg.mentions.length > 0 ? msg.mentions[0].staticAvatarURL : msg.author.staticAvatarURL

  if (args.length < 1) {
    return msg.channel.createMessage('You need to add something to search on google, try again.')
  }
  if (args.length > 140) {
    return msg.channel.createMessage(`Google Search too long. You're ${args.length - 140} characters over the limit!`)
  }

  if (msg.mentions.length > 0) {
    args = args.join(' ').substr(21)
  } else {
    args = args.join(' ')
  }

  const data = await Memer._snek
    .get('http://localhost/api/byemom')
    .set('Api-Key', Memer.config.imgenKey)
    .set('data-src', JSON.stringify([`${avatarurl}`, `${args}`]))

  if (data.status === 200) {
    await msg.channel.createMessage('', { file: data.body, name: 'byemom.png' })
  } else {
    msg.channel.createMessage(`Error: ${data.text}`)
  }
}

exports.props = {
  name: 'byemom',
  usage: '{command} <something to google search>',
  aliases: ['bye', 'google'],
  cooldown: 3000,
  description: 'Quick, mom is gone, what are you gonna search on google?'
}
