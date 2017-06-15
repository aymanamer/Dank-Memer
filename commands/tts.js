exports.run = function (client, msg, args, config, Discord) {

	if (!msg.channel.permissionsFor(client.user.id).has("SEND_MESSAGES") || !msg.channel.permissionsFor(client.user.id).has("SEND_TTS_MESSAGES")) {
		return msg.author.send('I either don\'t have permission to send messages or I don\'t have permission to send tts messages in #' + msg.channel.name)
	}
	
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