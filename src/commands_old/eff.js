exports.run = async function (Memer, msg) {
  /*
  msg.channel.createMessage({
    embed: {
      color: Memer.colors.lightblue,
      author: {name: 'Top 20 Respects Paid'},
      description: await effy(Memer)
    }
  })
}

async function effy (Memer) {
  let db = await Memer.db.getAllEffs()
  let counter = 1
  let data = await db.map(a => {
    const res = `${counter}. <@${a.userID}> - ${a.effs}`
    counter++
    return res
  })
  return data.join('\n')
  */
  msg.channel.createMessage('no u')
}

exports.props = {
  name: 'eff',
  usage: '{command}',
  aliases: [],
  cooldown: 1,
  description: 'When no one else agrees with you, Dank Memer does.',
  perms: ['embedLinks']
}
