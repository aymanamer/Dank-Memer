exports.run = function (client, msg, args, config) {
	if (!msg.channel.permissionsFor(client.user.id).has('ATTACH_FILES'))
		return msg.author.send(`I don't have permission to send pictures in #${msg.channel.name}`)

	if (!client.ids.donors.donor1.includes(msg.author.id))
		return msg.reply('to access this command, you must donate at the $10 tier here: <https://www.patreon.com/melmsie>')

	if (args.includes('pride'))
		msg.channel.send({ files: ['https://pbs.twimg.com/media/CIcqag7UwAA1NeJ.jpg'] })
	else
		msg.channel.send({ files: ['https://vignette4.wikia.nocookie.net/kancolle/images/8/81/Kappa.png'] })
}