exports.run = function (client, msg, args, config, Discord) {

	if (!args[0]) return msg.reply("Use this command to bother the developer, Melmsie.\n\nExample: `pls bother 'Your message to Melmsie'`\n\nIf you say nice things, maybe he'll like you. If you say not nice things, maybe he'll ban you from using the bot. ;)")


	client.shard.broadcastEval("this.channels.get('326384964964974602').send(args.join(' '))")

}
