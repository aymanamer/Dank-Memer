exports.run = function (client, msg) {
	if (!client.ids.donors.donor1.concat(client.ids.donors.donor5, client.ids.donors.donor10).includes(msg.author.id))
		return msg.reply('to access this command, you must donate at any tier here: <https://www.patreon.com/melmsie>')

	if (!msg.channel.permissionsFor(client.user.id).has('ATTACH_FILES'))
		return msg.reply('Well shit, there was a permission error! Make sure I have `attach files` so I can do this shit!').catch(() => console.error)

	msg.channel.send({
		files: ['http://www.stickpng.com/assets/thumbs/5845e69dfb0b0755fa99d7ef.png']
	})
}