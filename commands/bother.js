exports.run = function (client, msg, args, config) {

	if (!args[0]) return msg.reply('Use this command to bother the developer, Melmsie.\n\nExample: `pls bother \'Your message to Melmsie\'`\n\nIf you say nice things, maybe he\'ll like you. If you say not nice things, maybe he\'ll ban you from using the bot. ;)')

	if (msg.mentions.users.first() && msg.mentions.users.first().id !== config.owner)
		return msg.reply('Use this command to bother the developer, Melmsie. Not your friends.\n\nExample: `pls bother \'Your message to Melmsie\'`\n\nIf you say nice things, maybe he\'ll like you. If you say not nice things, maybe he\'ll ban you from using the bot. ;)')

	client.shard.broadcastEval(`const { RichEmbed } = require('discord.js')\nthis.channels.has('326384964964974602') && this.channels.get('326384964964974602').send({ embed: new RichEmbed().setAuthor('${msg.author.tag} | ${msg.author.id}').setDescription('${args.join(' ')}').addField('Sent from:', '${msg.channel.name} in ${msg.guild.name}').setColor('#00c853')})`)

	msg.reply('Your message has been sent to bother Melmsie!')
}
