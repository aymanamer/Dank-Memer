exports.run = function (client, msg, undefined, config) {
	if (!msg.channel.permissionsFor(client.user.id).has('ATTACH_FILES'))
		return msg.author.send(`I don't have permission to send pictures in #${msg.channel.name}`)

	if (!client.ids.donors.donor1.includes(msg.author.id))
		return msg.reply('to access this command, you must donate at the $10 tier here: <https://www.patreon.com/melmsie>')

	msg.channel.send({
		files: ['http://orig02.deviantart.net/40ce/f/2012/134/2/e/fuck_yeah__png_i_by_nataliaagustina-d4zsba2.png']
	})
}