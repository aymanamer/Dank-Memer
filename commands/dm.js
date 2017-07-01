exports.run = async function (client, msg, args, config, Discord) {
	if (config.owner !== msg.author.id) return
	const melmsie = client.users.get(config.owner)
	client.users.get(args[0]).send({
		embed: new Discord.RichEmbed()
			.setColor('#3676b3')
			.setTitle('You have received a message from the developer!')
			.setAuthor('Melmsie', melmsie.avatarURL)
			.setDescription(args.join(' ').slice(19))
			.setFooter('To reply, please use pls bother')
	})


}