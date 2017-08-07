const aliases = require('../cmdConfig.json').aliases
const tags = require('../tags.js')
const cooldowns = {
	active: {},
	times: require('../cmdConfig.json').cooldowns
}
const snekfetch = require('snekfetch')

exports.handleMeDaddy = async function (Memer, msg) {
	let command = msg.content.slice(Memer.config.prefix.length + 1).toLowerCase().split(' ')[0]
	const args = msg.cleanContent.split(' ').slice(2)

	if (!command) { return }

	if (Object.keys(tags).includes(command)) {
		//metrics.increment(`command.${command}`)
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
			const res = await snekfetch.get(tags[command].img)
			return await msg.channel.createMessage('', { file: res.body, name: 'hi.png' })
		}
	}

	if (!cooldowns.active[msg.author.id]) {
		cooldowns.active[msg.author.id] = []
	}

	if (aliases[command]) {
		command = aliases[command]
	}

	if (cooldowns.active[msg.author.id].includes(command)) {
		for (const i in Object.keys(Memer.cdMsg)) {
			if (cooldowns.active[msg.author.id].includes(Object.keys(Memer.cdMsg)[i]) && command === Object.keys(Memer.cdMsg)[i]) {
				return msg.channel.createMessage(Memer.cdMsg[Object.keys(Memer.utils.cdMsg)[i]])
			} else if (parseInt(i) === Object.keys(Memer.cdMsg).length - 1) {
				return msg.channel.createMessage('This command is on cooldown. Donors get to use ALL commands much faster!')
			}
		}
	}

	if (!Memer.config.devs.includes(msg.author.id)) {
		cooldowns.active[msg.author.id].push(command)
	}
	setTimeout(() => {
		cooldowns.active[msg.author.id].splice(cooldowns.active[msg.author.id].indexOf(command), 1)
	}, Memer.ids.donors.donor1.concat(Memer.ids.donors.donor5, Memer.ids.donors.donor10).includes(msg.author.id) ? cooldowns.times[command] * 0.10 : cooldowns.times[command])

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
		return console.log(`${command}: ${e.message}`)
	}
}