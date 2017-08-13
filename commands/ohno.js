const Jimp = require('jimp')
exports.run = async function (Memer, msg, args) {
	if (args.length < 1) {
		return msg.channel.createMessage('You need to add some text, try again.')
	}
	if (args.join(' ').length > 100) {
		return msg.channel.createMessage(`Text too long. You're ${args.join(' ').length - 100} characters over the limit!`)
	}
	let fontSetting
	if (args.join(' ').length < 38) {
		fontSetting = Jimp.FONT_SANS_32_BLACK
	} else {
		fontSetting = Jimp.FONT_SANS_16_BLACK
	}

	if (msg.mentions.length > 0) {
		args = args.join(' ').substr(21)
	} else {
		args = args.join(' ')
	}

	const text = args
	const mom = await Jimp.read('./assets/imgen/ohno.png')
	const blank = await Jimp.read('./assets/imgen/Empty.png')

	mom.resize(500, 500)
	Jimp.loadFont(fontSetting).then(function (font) {
		blank.resize(250, 250)
		const search = blank.print(font, 0, 0, text, 260)

		mom.composite(search, 262, 8)
		mom.getBuffer(Jimp.MIME_PNG, async (err, buffer) => {
			await msg.channel.createMessage('', { file: buffer, name: 'ohno.png' })
		})
	})

}