exports.run = function (client, msg, args, config) {

	if (!args[0]) return msg.reply('Use this command to bother the developer, Melmsie.\n\nExample: `pls bother \'Your message to Melmsie\'`\n\nIf you say nice things, maybe he\'ll like you. If you say not nice things, maybe he\'ll ban you from using the bot. ;)')

	if (msg.mentions.users.first() && msg.mentions.users.first().id !== config.owner)
		return msg.reply('Use this command to bother the developer, Melmsie. Not your friends.\n\nExample: `pls bother \'Your message to Melmsie\'`\n\nIf you say nice things, maybe he\'ll like you. If you say not nice things, maybe he\'ll ban you from using the bot. ;)')

	msg.channel.send(`Are you sure you want to bother melmsie with \`${args.join(' ')}\`? You will be **permanently banned** from using Dank Memer for any messages that are mean or racist. Answer with \`yes\`/\`no\`.`) // i copied this from tweet.js, you might want to rephrase
	const collector = msg.channel.createMessageCollector(m => msg.author.id === m.author.id, { time: 40000 })
	collector.on('collect', (m) => {
		if (m.content.toLowerCase() === 'yes') {
			client.shard.broadcastEval(`const { RichEmbed } = require('discord.js')\nthis.channels.has('330447317469626398') && this.channels.get('330447317469626398').send({ embed: new RichEmbed().setAuthor('${msg.author.tag} | ${msg.author.id}').setTimestamp(new Date()).setDescription('${args.join(' ')}').addField('Sent from:', '${msg.channel.name} in ${msg.guild.name}').setColor('#00c853')})`)
			msg.reply('Your message has been sent to bother Melmsie!')
		} else {
			msg.channel.send('Good. Watching you :eyes:')
		}
		return collector.stop()
	})
	collector.on('end', (collected, reason) => {
		if (reason === 'time')
			msg.channel.send('Prompt timed out.')
	})
}
