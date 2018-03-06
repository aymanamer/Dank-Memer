const { GenericCommand } = require('../../models/')
const { get } = require('snekfetch')

module.exports = new GenericCommand(
  async () => {
    const latestXKCD = await get('https://xkcd.com/info.0.json').then(r => r.body.num)

    const res = await get(`https://xkcd.com/${Math.floor(Math.random() * latestXKCD + 1)}/info.0.json`)

    return {
      author: { name: `Comic #${res.body.num} ${res.body.title}`, url: res.body.link },
      image: { url: res.body.img },
      description: res.body.alt,
      footer: { text: `https://xkcd.com` }
    }
  }, {
    triggers: ['xkcd'],
    description: 'Grabs a random comic from [xkcd](https://xkcd.com/)',
    perms: ['embedLinks']
  }
)
