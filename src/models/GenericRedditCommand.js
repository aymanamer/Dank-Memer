const { GenericCommand } = require('../models/')
const { get } = require('snekfetch')

const filters = {
  image: post => post.data.post_hint === 'image',
  text: post => !post.data.post_hint !== 'image' && post.data.selftext.length <= 2000 && post.data.title.length <= 256
}

module.exports = class GenericRedditCommand {
  constructor (cmdProps) {
    this.cmdProps = cmdProps
  }

  async run ({ Memer, msg, addCD }) {
    const res = await get(`https://www.reddit.com${this.cmdProps.endpoint}`)
    const posts = res.body.data.children.filter(filters[this.cmdProps.type])

    const indexes = Memer.indexes[this.cmdProps.triggers[0]]
    let index = indexes[msg.channel.guild.id]
    if (!index || index >= posts.length) {
      indexes[msg.channel.guild.id] = index = 1
    }

    const post = posts[index]
    indexes[msg.channel.guild.id]++

    await addCD()
    return {
      title: post.data.title,
      url: `https://www.reddit.com${post.data.permalink}`,
      image: { url: this.cmdProps.type === 'image' ? post.data.url : '' },
      description: post.data[this.cmdProps.type === 'image' ? 'url' : 'selftext'],
      footer: { text: `posted by ${post.data.author}` }
    }
  }

  get props () {
    return new GenericCommand(
      null,
      Object.assign({
        cooldown: 500,
        perms: ['embedLinks']
      }, this.cmdProps)
    ).props
  }
}
