exports.run = async function (client, msg, args, config, EmbedBuilder) {
	if (config.owner !== msg.author.id) return
	const melmsie = client.users.get(config.owner)
	try {
		let user
		if (client.users.get(args[0]))
			user = client.users.get(args[0])
		else
			user = await client.fetchUser(args[0])
		await user.send({
			embed: new EmbedBuilder()
				.setColor('#3676b3')
				.setTitle('📫 You have received a message from the developer!')
				.setAuthor('Melmsie', melmsie.avatarURL)
				.setDescription(args.slice(1).join(' '))
				.setFooter('To reply, please use pls bother')
		})
		await msg.react('📧')
	} catch (e) {
		await msg.react('❌')
		msg.channel.send(`**Fuck!** *${e}*`)
	}
}