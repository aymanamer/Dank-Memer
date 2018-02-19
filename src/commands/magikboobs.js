exports.run = async function (Memer, msg, args) {
/*
  const pron = await Memer._snek
    .get(`https://nekos.life/api/v2/img/boobs`)
    
  const data = await Memer._snek
    .get(`https://discord.services/api/magik?url=${pron.body.url}`)

  if (data.status === 200) {
    console.log(pron.body.url)
    await msg.channel.createMessage('', { file: data.body, name: 'magik.png' })
  } else {
    msg.channel.createMessage(`Error: ${data.text}`)
  }
  */
}

exports.props = {
  name: 'magikboobs',
  usage: '{command} @user',
  aliases: ['boobs'],
  cooldown: 5000,
  description: 'Make something magik!',
  perms: ['attachFiles']
}
