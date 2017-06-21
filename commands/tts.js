exports.run = function (client, msg, args) {
	if (!msg.channel.permissionsFor(client.user.id).has('SEND_TTS_MESSAGES')) {
		return msg.author.send('I don\'t have permission to send tts messages in #' + msg.channel.name)
	}

	if (!args[0]) {
		msg.channel.send('What do you want me to say?')
	} else {
		msg.channel.send(`${args.join(' ')}`, { tts: true })
	}
}