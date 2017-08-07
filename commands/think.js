const color = [0x7d5bbe, 0xa3d3fe, 0x333333, 0x007acc, 0xf56154, 0xdc3522]

exports.run = async function (Memer, msg) {
	const res = await Memer.snekfetch.get('https://www.reddit.com/r/Thinking/hot/.json?sort=hot&t=day&limit=400')
	const posts = res.body.data.children.filter(post => post.data.preview)

	if (!Memer.indexes.thonks[msg.channel.guild.id] || Memer.indexes.thonks[msg.channel.guild.id] >= posts.length) {
		Memer.indexes.thonks[msg.channel.guild.id] = 1
	}

	const post = posts[Memer.indexes.thonks[msg.channel.guild.id]]
	Memer.indexes.thonks[msg.channel.guild.id]++

	await msg.channel.createMessage({ embed: {
		title: post.data.title,
		color: color[Math.floor(Math.random() * color.length)],
		url: post.data.url,
		image: { url: post.data.preview.images[0].source.url.replace('gif', 'png') },
		description: post.data.url,
		footer: { text: `posted by ${post.data.author}` }
	}})
}