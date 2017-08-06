const utils = require('../utils.js')
const aliases = require('../cmdConfig.json').aliases
const tags = require('../tags.js')
const cooldowns = {
	active: {},
	times: require('../cmdConfig.json').cooldowns
}
const config = require('../config.json') // require from json
const snekfetch = require('snekfetch')

module.exports = async function (client, msg, metrics) {
	let command = msg.content.slice(config.prefix.length + 1).toLowerCase().split(' ')[0]
	const args = msg.content.split(' ').slice(2)

	if (!command) { return }

	if (Object.keys(tags).includes(command)) {
		//metrics.increment(`command.${command}`)
		if (args[0] === 'info') {
			return await msg.channel.createMessage({
				embed: {
					color: utils.colors.lightblue,
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

	try {
		delete require.cache[require.resolve(`../commands/${command}`)]
		if (!msg.channel.permissionsOf(client.user.id).has('sendMessages') ||
			!msg.channel.permissionsOf(client.user.id).has('embedLinks')) {
			return
		}
		await require(`../commands/${command}`).run(client, msg, args, utils, config)
		//metrics.increment('total.commands')
		//metrics.increment(`command.${command}`)
	} catch (e) {
		if (e.stack.startsWith('Error: Cannot find module')) {
			return
		}
		return console.log(`${command}: ${e.message}`)
	}
}