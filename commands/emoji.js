exports.run = async function (Memer, msg) { // this command is a pretty big mess, to be fixed later
	const guilds = Memer.client.guilds.filter(g => g.emojis[0])
	const guild = guilds[Math.floor(Math.random() * guilds.length)]
	const emoji = guild.emojis[Math.floor(Math.random() * guild.emojis.length)]
	msg.channel.createMessage({ embed: {
		color: Memer.colors.lightblue,
		thumbnail: { url: `https://cdn.discordapp.com/emojis/${emoji.id}.png` },
		author: { name: emoji.name },
		footer: { text: `from ${guild.name}` }
	}})
}