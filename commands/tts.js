exports.run = function (client, msg, args, config, Discord) {
	if (!msg.guild.member(client.user).hasPermission('SEND_MESSAGES')) return msg.author.send('I do not have permission to send messages in that channel! Please fix this to use this command.').catch(console.error)

	if (!msg.guild.member(client.user).hasPermission('SEND_TTS_MESSAGES')) return msg.author.send('I do not have permission to send messages in that channel! Please fix this to use this command.').catch(console.error)

	
		try {
			if (!args[0]) {
				msg.channel.send('What do you want me to say?')
			} else {
				msg.channel.send(`${args.join(' ')}`, { tts: true })
			}
		} catch (e) {
			msg.channel.sendCode("js", e.message)
		}
	

}