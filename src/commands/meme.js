exports.run = async function (Memer, msg) {
  const res = await Memer._snek.get('https://www.reddit.com/u/kerdaloo/m/dankmemer/top/.json?sort=top&t=day&limit=500')
  const posts = res.body.data.children.filter(post => post.data.post_hint === 'image')

  if (!Memer.indexes.meme[msg.channel.guild.id] || Memer.indexes.meme[msg.channel.guild.id] >= posts.length) {
    Memer.indexes.meme[msg.channel.guild.id] = 1
  }

  const post = posts[Memer.indexes.meme[msg.channel.guild.id]]
  Memer.indexes.meme[msg.channel.guild.id]++

  await msg.channel.createMessage({ embed: {
    title: post.data.title,
    color: Memer.randomColor(),
    url: post.data.url,
    image: { url: post.data.url },
    description: post.data.url,
    footer: { text: `posted by ${post.data.author}` }
  }})
}

exports.props = {
  name: 'meme',
  usage: '{command}',
  aliases: ['maymay'],
  cooldown: 1000,
  description: 'See the top new memes on reddit!',
  perms: ['embedLinks']
}
