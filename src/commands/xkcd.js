

exports.run = async function (Memer, msg) {
    getDogPic(Memer, msg)
  }
  
  async function getDogPic (Memer, msg) {
    const random = Math.floor(Math.random() * 1957 + 1)
    const data = await Memer._snek.get(`https://xkcd.com/${random}/info.0.json`) 
    msg.channel.createMessage({
      embed: {
        author: { name: `Comic #${data.body.num} ${data.body.title}`, url: data.body.link} ,
        color: Memer.randomColor(),
        image: { url: data.body.img },
        description: data.body.alt,
        footer: { text: `https://xkcd.com` }
      }
    })
  }
  
  exports.props = {
    name: 'xkcd',
    usage: '{command}',
    aliases: [],
    cooldown: 1000,
    description: 'Grabs a random comic from [xkcd](https://xkcd.com/)',
    perms: ['embedLinks']
  }
  
