exports.run = async function (Memer, msg) {
  getDogPic(Memer, msg)
}

async function getDogPic (Memer, msg) {
  const data = await Memer._snek.get('http://api.icndb.com/jokes/random')
  msg.channel.createMessage({
    embed: {
      title: '👊 Chuck Norris 👊',
      color: Memer.randomColor(),
      description: data.body.value.joke.replace(/&quot;/g, '"')
    }
  })
}

exports.props = {
  name: 'chucknorris',
  usage: '{command}',
  aliases: ['chuck', 'norris'],
  cooldown: 1000,
  description: 'Lets learn about God',
  perms: ['embedLinks']
}
