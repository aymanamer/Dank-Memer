const aliases = require('../cmdConfig.json').aliases
const tags = require('../tags.js')

exports.handleMeDaddy = async function (Memer, msg, gConfig) {
	let command = msg.content.slice(gConfig.prefix.length + 1).toLowerCase().split(' ')[0]
	if (!command || gConfig.disabledCommands.includes(command) || gConfig.disabledCommands.includes(aliases[command])) { return }
	const args = msg.cleanContent.split(' ').slice(gConfig.prefix.split(' ').length + 1)

	if (Object.keys(tags).includes(command)) {
		Memer.metrics.increment(`command.${command}`)
		if (args[0] === 'info') {
			return await msg.channel.createMessage({
				embed: {
					color: Memer.colors.lightblue,
					thumbnail: { url: tags[command].img },
					description: tags[command].info,
					footer: { text: 'brought to you by knowyourmeme.com' }
				}
			})
		} else {
			const res = await Memer.snek.get(tags[command].img)
			return await msg.channel.createMessage('', { file: res.body, name: 'hi.png' })
		}
	}

	if (aliases[command]) {
		command = aliases[command]
	}

	const cooldown = await Memer.db.getCooldown(command, msg.author.id)

	if (cooldown > Date.now()) {
		return msg.channel.createMessage(`u got 2 wait ${(cooldown - Date.now()) / 1000} seconds`)
	}

	await Memer.db.addCooldown(command, msg.author.id)

	try {
		delete require.cache[require.resolve(`../commands/${command}`)]
		if (!msg.channel.permissionsOf(Memer.client.user.id).has('sendMessages') ||
			!msg.channel.permissionsOf(Memer.client.user.id).has('embedLinks') ||
			!msg.channel.permissionsOf(Memer.client.user.id).has('attachFiles') ||
			!msg.channel.permissionsOf(Memer.client.user.id).has('addReactions')) {
			return
		}
		await require(`../commands/${command}`).run(Memer, msg, args)
		Memer.metrics.increment('total.commands')
		Memer.metrics.increment(`command.${command}`)
	} catch (e) {
		if (e.stack.startsWith('Error: Cannot find module')) {
			return
		}
		return Memer.log(`${msg.author.username} | ${msg.author.id} | ${command}: ${e.message}`, 'error')
	}
}
