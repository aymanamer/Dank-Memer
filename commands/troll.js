exports.run = function (client, msg) {
	if (!msg.channel.permissionsFor(client.user.id).has('ATTACH_FILES')) {
		return msg.reply('Well shit, there was a permission error! Make sure I have `attach files` so I can do this shit!')
	}

	if (!client.ids.donors.donor1.concat(client.ids.donors.donor5, client.ids.donors.donor10).includes(msg.author.id)) {
		return msg.reply('to access this command, you must donate at any tier here: <https://www.patreon.com/melmsie>')
	}

	msg.channel.send({ files: ['http://www.stickpng.com/assets/images/580b585b2edbce24c47b2a27.png'] })
}