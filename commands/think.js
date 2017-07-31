const snekfetch = require('snekfetch')
const color = [0x7d5bbe, 0xa3d3fe, 0x333333, 0x007acc, 0xf56154, 0xdc3522]

exports.run = async function (client, msg) {
	const res = await snekfetch.get('https://www.reddit.com/r/Thinking/hot/.json?sort=hot&t=day&limit=400')
	const posts = res.body.data.children.filter(post => post.data.preview)

	if (!client.indexes.thonks[msg.guild.id] || client.indexes.thonks[msg.guild.id] >= posts.length) {
		client.indexes.thonks[msg.guild.id] = 1
	}

	const post = posts[client.indexes.thonks[msg.guild.id]]
	client.indexes.thonks[msg.guild.id]++

	await msg.channel.send({
		embed: {
			title: post.data.title,
			color: color[Math.floor(Math.random() * color.length)],
			url: post.data.url,
			image: { url: post.data.preview.images[0].source.url.replace('gif', 'png') },
			description: post.data.url,
			footer: { text: `posted by ${post.data.author}` }
		}
	})
}