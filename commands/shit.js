const Jimp = require('jimp')

exports.run = async function (client, msg, args) {

	if (!msg.channel.permissionsFor(client.user.id).has('ATTACH_FILES'))
		return msg.reply('Well shit, there was a permission error! Make sure I have `attach files` so I can do this shit!').catch(() => console.error)

	if (msg.mentions.users.size > 0) {
		args = msg.mentions.users.first().username
	} else {
		if (args === 0) {
			args = msg.author.username
		} else if (args.length > 47) {
			return msg.channel.send(`This shit was too large. You're ${args.length - 47} characters over the limit!`)
		} else {
			args = args.join(' ')
		}
	}


	const text = args
	const mom = await Jimp.read('./assets/imgen/shit.jpg')
	const blank = await Jimp.read('./assets/imgen/empty.png')

	const font = await Jimp.loadFont(Jimp.FONT_SANS_16_BLACK)

	blank.resize(275, 200)
	const search = blank.print(font, 0, 0, text)
	search.rotate(335)

	mom.composite(search, 375, 465)
	mom.getBuffer(Jimp.MIME_PNG, async(err, buffer) => {
		try {
			await msg.channel.send({
				files: [{
					name: 'mom.png',
					attachment: buffer
				}]
			})
		} catch (err) {
			msg.channel.send(`Error: ${err.message}`)
		}
	})


}