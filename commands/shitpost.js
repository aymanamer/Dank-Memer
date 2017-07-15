const snekfetch = require('snekfetch')
const color = [0x7d5bbe, 0xa3d3fe, 0x333333, 0x007acc, 0xf56154, 0xdc3522]

exports.run = async function (client, msg, args, config) {

	const votes = await snekfetch.get('https://discordbots.org/api/bots/270904126974590976/votes?onlyids=1').set('Authorization', config.orgtoken)
	if (!votes.body.includes(msg.author.id))
		return msg.channel.send(`Hey, <@${msg.author.id}>! You have to go vote at https://discordbots.org/bot/270904126974590976 to use this command this week, as this bot is competing with a few others. It will return to normal in a few days. Thank you!\n\nAll you have to do is log in via discord in the top right corner, and click "vote"!`)

	const res = await snekfetch.get('https://www.reddit.com/r/copypasta/top/.json?sort=top&t=week&limit=500')
	const posts = res.body.data.children.filter(post => !post.data.preview && post.data.selftext.length <= 1900 && post.data.title.length <= 250)

	if (!client.indexes.shitpost[msg.guild.id] || client.indexes.shitpost[msg.guild.id] >= posts.length)
		client.indexes.shitpost[msg.guild.id] = 1

	const post = posts[client.indexes.shitpost[msg.guild.id]]
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
