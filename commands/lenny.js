exports.run = function (client, msg) {
	if (!client.ids.donors.donor1.concat(client.ids.donors.donor5, client.ids.donors.donor10).includes(msg.author.id)) {
		return msg.reply('to access this command, you must donate at any tier here: <https://www.patreon.com/melmsie>')
	}

	msg.channel.send('( ͡° ͜ʖ ͡° )')
}