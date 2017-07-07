exports.run = function (client, msg) {
	if (!msg.channel.permissionsFor(client.user.id).has('ATTACH_FILES'))
		return msg.reply('Well shit, there was a permission error! Make sure I have `attach files` so I can do this shit!').catch(() => console.error)

	msg.channel.send({
		files: ['https://cdn.discordapp.com/attachments/323358888290287617/323640995172319232/detain.gif']
	}).catch(() => console.error)
}