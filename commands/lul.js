exports.run = function (client, msg, undefined, config) {
	if (!msg.channel.permissionsFor(client.user.id).has('ATTACH_FILES')) {
		return msg.author.send('I don\'t have permission to send pictures in #' + msg.channel.name)
	}
	if (!config.donor10.includes(msg.author.id))
		return msg.reply('to access this command, you must donate at the $10 tier here: <https://www.patreon.com/melmsie>')

	msg.channel.send({ files: ['https://static-cdn.jtvnw.net/jtv_user_pictures/l_only_say_lul-profile_image-b558b7ec1d7e496e-300x300.png'] })
}