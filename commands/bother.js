exports.run = async function (Memer, msg, args) {
	if (!args[0] || msg.mentions[0]) {
		return Memer.reply(`Use this command to bother the developer, Melmsie, with bug reports or just for the sake of talking to him.\n\nExample: \`pls bother \'Your message to Melmsie\'\`\n\nJust remember, he can and will ban you from using the bot for being a dick. Currently banned: ${Memer.ids.blocked.user.length} idiots.`, msg)
	}

	msg.channel.createMessage(`Are you sure you want to bother melmsie with \`${args.join(' ')}\`?\n\nYou will be **permanently banned** from using Dank Memer for any messages that he doesn't like. Answer with \`yes\`/\`no\`.`)

	const [messages, reason] = await Memer.createMessageCollector(msg.channel, m => m.author.id === msg.author.id, { maxMatches: 1, time: 30000 })

	if (reason === 'maxMatches' && messages[0].content.toLowerCase() === 'yes') {
		const guild = Memer.client.guilds.get('345979581850714112')
		if (!guild || !guild.channels.get('345979581850714112')) {
			Memer.log('Uncached channel on bother', 'warn')
			return msg.channel.createMessage('Something went wrong. Please try again later.')
		}
		Memer.client.createMessage('326384964964974602', { embed: {
			author: { name: `${msg.author.username}#${msg.author.discriminator} ${msg.author.id}` },
			fields: [ { name: 'Sent from:', value: `#${msg.channel.name} in ${msg.channel.guild.name}` } ],
			color: Memer.colors.green,
			footer: { text: `Guild ID: ${msg.channel.guild.id} `},
			timestamp: new Date(),
			description: args.join(' ')
		}})
		Memer.reply('Your message has been sent to bother Melmsie!', msg)
	} else if (reason === 'maxMatches' && messages[0].content.toLowerCase() === 'no') {
		msg.channel.createMessage('Good. Watching you :eyes:')
	} else if (reason === 'maxMatches') {
		msg.channel.createMessage('mk bye then')
	} else {
		msg.channel.createMessage('Prompt timed out.')
	}
}
