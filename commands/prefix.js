exports.run = async function (Memer, msg, args) {
	if (!msg.member.permission.has('manageGuild')) {
		return Memer.reply('You are not authorized to use this command. ', msg)
	}
	const gConfig = await Memer.db.getGuild(msg.channel.guild.id)
	if (!args[0]) {
		return Memer.reply(`What do you want your new prefix to be?\n\nExample: \`${gConfig.prefix} prefix plz\``, msg) // please think of a better example..
	}
	if (args.join(' ').length > 10) {
		return Memer.reply(`Your prefix can't be over 10 characters long. You're ${args.join(' ').length - 10} characters over the limit.`, msg)
	}
	if (gConfig.prefix === args.join(' ')) {
		return Memer.reply(`\`${gConfig.prefix}\` is already your current prefix.`, msg)
	}
	gConfig.prefix = args.join(' ')
	await Memer.db.updateGuild(gConfig)
	msg.channel.createMessage({ embed: {
		color: Memer.colors.green,
		description: `Prefix successfully changed to \`${gConfig.prefix}\`.`
	}})
}