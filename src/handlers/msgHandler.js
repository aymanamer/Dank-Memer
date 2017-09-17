exports.handleMeDaddy = async function (Memer, msg, gConfig) {
	let command = msg.content.slice(gConfig.prefix.length + 1).toLowerCase().split(' ')[0]
	const args = msg.cleanContent.split(' ').slice(gConfig.prefix.split(' ').length + 1)

	if (Memer.cmds.has(command)) {
		command = Memer.cmds.get(command)
	} else if (Memer.aliases.has(command)) {
		command = Memer.cmds.get(Memer.aliases.get(command))
	} else if (Memer.tags.has(command)) {
		const tag = Memer.tags.get(command)
		if (args[0] === 'info') {
			await msg.channel.createMessage({ embed: {
				color: Memer.colors.lightblue,
				thumbnail: { url: tag.img },
				description: tag.info,
				footer: { text: 'brought to you by knowyourmeme.com' }
			}})
		} else {
			const res = await Memer._snek.get(tag.img)
			await msg.channel.createMessage('', { file: res.body, name: 'hi.png' })
		}
		return
	}

	if (!command.run || gConfig.disabledCommands.includes(command.props.name)) {
		return
	}

	const cooldown = await Memer.db.getCooldown(command.props.name, msg.author.id)
	if (cooldown > Date.now()) {
		const waitTime = (cooldown - Date.now()) / 1000
		return msg.channel.createMessage(`u got 2 wait ${waitTime > 60 ? Memer.parseTime(waitTime) : `${waitTime.toFixed()} secunds`}!!!1!`)
	}
	await Memer.db.addCooldown(command.props.name, msg.author.id)

	try {
		const permissions = msg.channel.permissionsOf(Memer.bot.user.id)
		if (!permissions.has('sendMessages') ||
								!permissions.has('embedLinks') ||
								!permissions.has('attachFiles') ||
								!permissions.has('addReactions')) {
			return
		}
		msg.reply = (str) => { msg.channel.createMessage(`${msg.author.mention}, ${str}`) }
		await command.run(Memer, msg, args)
	} catch (e) {
		msg.channel.createMessage('Something went wrong while executing this command. \nPlease join here (<https://goo.gl/yyngZG>) if the issue persists.') // meme-ier format?
		return Memer.log(`Command error:\n\tCommand: ${command.props.name}\n\tSupplied arguments: ${args.join(', ')}\n\tError: ${e.stack}`, 'error')
	}
}
