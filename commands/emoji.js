exports.run = async function (client, msg, args, config, Discord) {
	let emoji = await client.guilds.filter(g => g.emojis.first()).random().emojis.random()
	msg.channel.send({
		embed: new Discord.RichEmbed()
			.setColor('#3676b3')
			.setThumbnail(emoji.url)
			.setAuthor(emoji.name)
			.setFooter(`from ${emoji.guild.name}`)
	})
}