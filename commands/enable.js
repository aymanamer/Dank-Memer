exports.run = async function (Memer, msg, args) {
	const gConfig = await Memer.db.getGuild(msg.channel.guild.id)
	args = removeDuplicates(args)
	if (!args[0]) {
		return Memer.reply(`Specify a command to enable, or multiple.\n\nExample: \`${gConfig.prefix} enable meme trigger shitsound\` or \`${gConfig.prefix} enable meme\``, msg)
	}
	if (args.some(cmd => !Memer.commands.includes(cmd))) {
		Memer.reply(`The following commands are invalid: \n\n${args.filter(cmd => !Memer.commands.includes(cmd)).map(cmd => `\`${cmd}\``).join(', ')}\n\nPlease make sure all of your commands are valid and try again.`, msg)
	}
	if (args.some(cmd => !gConfig.disabledCommands.includes(cmd))) {
		return msg.channel.createMessage(`The following commands currently aren't disabled: \n\n${args.filter(cmd => !gConfig.disabledCommands.includes(cmd)).map(cmd => `\`${cmd}\``).join(', ')}  \n\nPlease make sure all of your arguments are valid and try again.`)
	}
	args.map(cmd => {
		gConfig.disabledCommands.splice(gConfig.disabledCommands.indexOf(cmd), 1)
	})
	await Memer.db.updateGuild(gConfig)
	Memer.reply(`The following commands have been enabled successfully:\n\n${args.map(cmd => `\`${cmd}\``).join(', ')}`, msg)
}

function removeDuplicates (arr) {
	return Array.from(new Set(arr).values())
}