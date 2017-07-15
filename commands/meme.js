const snekfetch = require('snekfetch')
const color = [0x7d5bbe, 0xa3d3fe, 0x333333, 0x007acc, 0xf56154,  0xdc3522]

exports.run = async function (client, msg) {


	const res = await snekfetch.get('https://www.reddit.com/u/kerdaloo/m/dankmemer/top/.json?sort=top&t=day&limit=500')
	const posts = res.body.data.children.filter(post => post.data.preview)

	if (!client.indexes.meme[msg.guild.id] || client.indexes.meme[msg.guild.id] >= posts.length)
		client.indexes.meme[msg.guild.id] = 1

	const post = posts[client.indexes.meme[msg.guild.id]]
	client.indexes.meme[msg.guild.id]++

	msg.channel.send({ embed: {
		title: post.data.title,
		color: color[Math.floor(Math.random() * color.length)],
		url: post.data.url,
		image: { url: post.data.preview.images[0].source.url },
		description: post.data.url,
		footer: { text: `posted by ${post.data.author}` }
	}})
}