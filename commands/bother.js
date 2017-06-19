exports.run = function (client, msg, args, config, Discord) {

	if (!args[0]) return msg.reply("Use this command to bother the developer, Melmsie.\n\nExample: `pls bother 'Your message to Melmsie'`\n\nIf you say nice things, maybe he'll like you. If you say not nice things, maybe he'll ban you from using the bot. ;)")

	if (msg.mentions.users.first() && msg.mentions.users.first().id !== config.owner) return msg.reply("Use this command to bother the developer, Melmsie. Not your friends.\n\nExample: `pls bother 'Your message to Melmsie'`\n\nIf you say nice things, maybe he'll like you. If you say not nice things, maybe he'll ban you from using the bot. ;)")

	client.shard.broadcastEval(`this.channels.has('326384964964974602') && this.channels.get('326384964964974602').send(\`${msg.author.tag} (${msg.author.id})\n\n${args.join(' ')}\n\n#${msg.channel.name} from ${msg.guild.name}\`)`)
	
}
