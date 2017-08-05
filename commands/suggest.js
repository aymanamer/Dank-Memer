
exports.run = function (client, msg, args, utils, config) {
	if (!args[0]) {
		return msg.reply(`Use this command to suggest things to the developers.\n\nExample: \`pls suggest \'a cool command idea\'\`\n\nJust remember, you can and will be banned from using the bot for being a dick. Currently banned: ${client.ids.blocked.user.length} idiots.`)
	}

	if (msg.mentions.users.first() && msg.mentions.users.first().id !== config.owner) {
		return msg.reply(`Use this command to suggest commands.\n\nExample: \`pls bother \'Your command idea\'\`\n\nJust remember, he can and will ban you from using the bot for being a dick. Currently banned: ${client.ids.blocked.user.length} idiots.`)
	}

	msg.channel.send(`Are you sure you want to suggest \`${args.join(' ')}\`?\n\nYou will be **permanently banned** from using Dank Memer for any messages that are seen as trolling or rude. Answer with \`yes\`/\`no\`.`)
	const collector = msg.channel.createMessageCollector(m => msg.author.id === m.author.id, { time: 40000 })
	collector.on('collect', (m) => {
		if (m.content.toLowerCase() === 'yes') {
			client.shard.broadcastEval(`
				this.channels.has('326384964964974602') && this.channels.get('326384964964974602').send({ embed: {
					author: { name: 'A_TAG | A_ID' },
					description: 'ARGS',
					fields: [ { name: 'Sent from:', value: '#C_NAME in G_NAME' } ],
					color: ${utils.colors.purple},
					footer: { text: 'Guild ID: G_ID' },
					timestamp: new Date()
				} })`
				.replace(/C_NAME/g, msg.channel.name.replace(/'|"|`/g, ''))
				.replace(/G_ID/g, msg.guild.id)
				.replace(/G_NAME/g, msg.guild.name.replace(/'|"|`/g, ''))
				.replace(/A_TAG/g, msg.author.tag.replace(/'|"|`/g, ''))
				.replace(/A_ID/g, msg.author.id)
				.replace(/ARGS/g, args.join(' ').replace(/'|"|`/g, '')))
				.catch(err => console.log(`SUGGEST BROADCASTEVAL ERR: ${err.stack}`))
			msg.reply('Your message has been sent to the developers!')
		} else if (m.content.toLowerCase() === 'no') {
			msg.channel.send('Good. Watching you :eyes:')
		}
		return collector.stop()
	})
	collector.on('end', (collected, reason) => {
		if (reason === 'time') {
			msg.channel.send('Prompt timed out.')
		}
	})
}
