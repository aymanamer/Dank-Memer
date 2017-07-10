exports.run = async function (client, msg, args, config, EmbedBuilder) {
	const emoji = await client.guilds.filter(g => g.emojis.first()).random().emojis.random()
	msg.channel.send({
		embed: new EmbedBuilder()
			.setColor('#3676b3')
			.setThumbnail(emoji.url)
			.setAuthor(emoji.name)
			.setFooter(`from ${emoji.guild.name}`)
	})
}