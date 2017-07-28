exports.run = function (client, msg) {
	if (!msg.channel.permissionsFor(client.user.id).has('ATTACH_FILES')) {
		return msg.reply('Well shit, there was a permission error! Make sure I have `attach files` so I can do this shit!')
	}

	if (!client.ids.donors.donor1.concat(client.ids.donors.donor5, client.ids.donors.donor10).includes(msg.author.id)) {
		return msg.reply('to access this command, you must donate at any tier here: <https://www.patreon.com/melmsie>')
	}

	msg.channel.send({
		files: ['http://orig02.deviantart.net/40ce/f/2012/134/2/e/fuck_yeah__png_i_by_nataliaagustina-d4zsba2.png']
	})
}