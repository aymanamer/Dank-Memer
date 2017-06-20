exports.run = function (client, msg) {
	if (!msg.channel.permissionsFor(client.user.id).has('ATTACH_FILES')) {
		return msg.author.send('I don\'t have permission to send pictures in #' + msg.channel.name)
	}

	msg.channel.send({ files: ['https://cdn.discordapp.com/attachments/323358888290287617/323640995172319232/detain.gif'] })
}
