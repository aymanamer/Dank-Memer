exports.run = async function (Memer, msg, args) {
	if (!args[0] || msg.mentions[0]) {
		return Memer.reply('Use this command to suggest things to the developers.\n\nExample: `pls suggest \'a cool command idea\'`\n\nJust remember, you can and will be banned from using the bot for being a dick.', msg)
	}

	if (args.join(' ').toLowerCase().includes('a cool command idea')) {
		return Memer.reply('That\'s not how you use this command. You need to *actually* think of a suggestion, not literally `a cool command idea`, you fucking idiot. 😩', msg)
	}

	if (Memer.commands.includes(args.join(' '))) {
		return msg.channel.createMessage('bitch u mad mf ugly b looking like the little kid from little einstein ill shoot u mf ass meet me irl fuck outta here wicho dorito ass shaped head btch albino gorilla lookin ass mf ill flame u dumb spotty white pizza shaped head lookin elongated ass nose marshmallow man crusty ass mf self right here btch ass, **now __don\'t__ suggest a command that already exists hoe**')
	}

	msg.channel.createMessage(`Are you sure you want to suggest \`${args.join(' ')}\`?\n\nYou will be **permanently banned** from using Dank Memer for any messages that are seen as trolling or rude. Answer with \`yes\`/\`no\`.`)

	const [messages, reason] = await Memer.createMessageCollector(msg.channel, m => m.author.id === msg.author.id, { maxMatches: 1, time: 30000 })

	if (reason === 'maxMatches' && messages[0].content.toLowerCase() === 'yes') {
		const guild = Memer.client.guilds.get('281482896265707520')
		if (!guild || !guild.channels.get('345979581850714112')) {
			Memer.log('Uncached channel on bother', 'warn')
			return msg.channel.createMessage('Something went wrong. Please try again later.')
		}
		Memer.client.createMessage('326384964964974602', { embed: {
			author: { name: `${msg.author.username}#${msg.author.discriminator} ${msg.author.id}` },
			fields: [ { name: 'Sent from:', value: `#${msg.channel.name} in ${msg.channel.guild.name}` } ],
			color: Memer.colors.purple,
			footer: { text: `Guild ID: ${msg.channel.guild.id} `},
			timestamp: new Date(),
			description: args.join(' ')
		}})
		Memer.reply('Your suggestion has been sent to the developers.', msg)
	} else if (reason === 'maxMatches' && messages[0].content.toLowerCase() === 'no') {
		msg.channel.createMessage('Good. Watching you :eyes:')
	} else if (reason === 'maxMatches') {
		msg.channel.createMessage('mk bye then')
	} else {
		msg.channel.createMessage('Prompt timed out.')
	}
}