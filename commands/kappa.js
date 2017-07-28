exports.run = function (client, msg, args) {
	if (!msg.channel.permissionsFor(client.user.id).has('ATTACH_FILES')) {
		return msg.reply('Well shit, there was a permission error! Make sure I have `attach files` so I can do this shit!')
	}

	if (!client.ids.donors.donor1.concat(client.ids.donors.donor5, client.ids.donors.donor10).includes(msg.author.id)) {
		return msg.reply('to access this command, you must donate at any tier here: <https://www.patreon.com/melmsie>')
	}

	if (args.includes('pride')) {
		msg.channel.send({ files: ['https://pbs.twimg.com/media/CIcqag7UwAA1NeJ.jpg'] })
	} else {
		msg.channel.send({ files: ['https://vignette4.wikia.nocookie.net/kancolle/images/8/81/Kappa.png'] })
	}
}