const snekfetch = require('snekfetch')
const color = [0x7d5bbe, 0xa3d3fe, 0x333333, 0x007acc, 0xf56154, 0xdc3522]

exports.run = async function (client, msg) {
	const res = await snekfetch.get('https://www.reddit.com/r/copypasta/top/.json?sort=top&t=week&limit=500')
	let posts = res.body.data.children.filter(post => !post.data.preview && post.data.selftext.length <= 1900 && post.data.title.length <= 250)

	if (!client.indexes.shitpost[msg.guild.id] || client.indexes.shitpost[msg.guild.id] >= posts.length)
		client.indexes.shitpost[msg.guild.id] = 1

	let post = posts[client.indexes.shitpost[msg.guild.id]]
	client.indexes.shitpost[msg.guild.id]++

	msg.channel.send({
		embed: {
			
			color: color[Math.floor(Math.random() * color.length)],
			url: post.data.url,
			description: post.data.selftext,
			footer: { text: `posted by ${post.data.author}` }
		}
	})
}
