const snekfetch = require('snekfetch')
const color = [0x7d5bbe, 0xa3d3fe, 0x333333, 0x007acc, 0xf56154,  0xdc3522]

exports.run = async function (client, msg, args, config) {

	const votes = await snakefetch.get('https://discordbots.org/api/bots/270904126974590976/votes?onlyids=1').set('Authorization', config.orgtoken)
	if (!votes.body.includes(msg.author.id))
		return msg.channel.send(`Hey, <@${msg.author.id}>! You have to go vote at https://discordbots.org/bot/270904126974590976 to use this command this week, as this bot is competing with a few others! Thank you!`)

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