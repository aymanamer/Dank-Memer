exports.run = async function (Memer, msg, args) {
	if (!msg.member.permission.has('manageGuild')) {
		return Memer.reply('You are not authorized to use this command. ', msg)
	}
	const gConfig = await Memer.db.getGuild(msg.channel.guild.id)
	args = removeDuplicates(args.filter(cmd => !gConfig.disabledCommands.includes(cmd)))
	if (!args[0]) {
		return Memer.reply(`Specify a command to disable, or multiple.\n\nExample: \`${gConfig.prefix} disable meme trigger shitsound\` or \`${gConfig.prefix} disable meme\``, msg)
	}
	if (args.some(cmd => !Memer.commands.includes(cmd))) {
		Memer.reply(`The following commands are invalid: \n\n${args.filter(cmd => !Memer.commands.includes(cmd)).map(cmd => `\`${cmd}\``).join(', ')}\n\nPlease make sure all of your commands are valid and try again.`, msg)
	}
	gConfig.disabledCommands = gConfig.disabledCommands.concat(args)
	await Memer.db.updateGuild(gConfig)
	Memer.reply(`The following commands have been disabled successfully:\n\n${args.map(cmd => `\`${cmd}\``).join(', ')}`, msg)
}

function removeDuplicates (arr) {
	return Array.from(new Set(arr).values())
}