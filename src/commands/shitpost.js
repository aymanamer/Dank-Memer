const color = [0x7d5bbe, 0xa3d3fe, 0x333333, 0x007acc, 0xf56154, 0xdc3522]

exports.run = async function (Memer, msg) {
	const res = await Memer._snek.get('https://www.reddit.com/r/copypasta/top/.json?sort=top&t=week&limit=500')
	const posts = res.body.data.children.filter(post => !post.data.preview && post.data.selftext.length <= 1900 && post.data.title.length <= 250)

	if (!Memer.indexes.shitpost[msg.channel.guild.id] || Memer.indexes.shitpost[msg.channel.guild.id] >= posts.length) {
		Memer.indexes.shitpost[msg.channel.guild.id] = 1
	}

	const post = posts[Memer.indexes.shitpost[msg.channel.guild.id]]
	Memer.indexes.shitpost[msg.channel.guild.id]++

	await msg.channel.createMessage({
		embed: {
			color: color[Math.floor(Math.random() * color.length)],
			url: post.data.url,
			description: post.data.selftext,
			footer: { text: `posted by ${post.data.author}` }
		}
	})
}

exports.props = {
	name        : 'shitpost',
	usage       : '{command}',
	aliases     : ['copypasta'],
	cooldown    : 1000,
	description : 'See the top copypastas on reddit!'
}
