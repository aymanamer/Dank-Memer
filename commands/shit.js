const Jimp = require('jimp')

exports.run = async function (client, msg, args) {
	/*
	if (!msg.channel.permissionsFor(client.user.id).has('ATTACH_FILES')) {
		return msg.reply('Well shit, there was a permission error! Make sure I have `attach files` so I can do this shit!')
	}*/

	if (msg.mentions.users.size > 0) {
		args = msg.mentions.users.first().username
	} else {
		if (args < 1) {
			args = msg.author.username
		} else if (args.join(' ').length > 35) {
			return msg.channel.send(`This shit was too large. You're ${args.join(' ').length - 35} characters over the limit!`)
		} else {
			args = args.join(' ')
		}
	}

	const text = args
	const mom = await Jimp.read('./assets/imgen/shit.jpg')
	const blank = await Jimp.read('./assets/imgen/Empty.png')

	const font = await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK)

	blank.resize(350, 350)
	const search = blank.print(font, 0, 0, text, 350)
	search.rotate(310)

	mom.composite(search, 195, 585)
	mom.getBuffer(Jimp.MIME_PNG, async(err, buffer) => {
		try {
			await msg.channel.send({
				files: [{
					name: 'shit.png',
					attachment: buffer
				}]
			})
		} catch (err) {
			msg.channel.send(`Error: ${err.message}`)
		}
	})
}