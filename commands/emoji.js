exports.run = async function (client, msg, args, utils) {
	const emoji = await client.guilds.filter(g => g.emojis.first()).random().emojis.random()
	await msg.channel.send({ embed: {
		color: utils.colors.lightblue,
		thumbnail: { url: emoji.url },
		author: { name: emoji.name },
		footer: { text: `from ${emoji.guild.name}` }

	}})
}