exports.run = function (client, msg) {
	if (!msg.channel.permissionsFor(client.user.id).has('ATTACH_FILES')) {
		return msg.reply('Well shit, there was a permission error! Make sure I have `attach files` so I can do this shit!')
	}

	if (!client.ids.donors.donor1.concat(client.ids.donors.donor5, client.ids.donors.donor10).includes(msg.author.id)) {
		return msg.reply('to access this command, you must donate at any tier here: <https://www.patreon.com/melmsie>')
	}

	msg.channel.send({ files: ['https://static-cdn.jtvnw.net/jtv_user_pictures/l_only_say_lul-profile_image-b558b7ec1d7e496e-300x300.png'] })
}