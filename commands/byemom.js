const Jimp = require('jimp')

exports.run = async function (client, msg, args) {
	if (!msg.channel.permissionsFor(client.user.id).has('ATTACH_FILES')) {
		return msg.reply('Well shit, there was a permission error! Make sure I have `attach files` so I can do this shit!')
	}

	const avatarurl = msg.mentions.users.size > 0 ? msg.mentions.users.first().displayAvatarURL.replace('gif', 'png') : msg.author.displayAvatarURL.replace('gif', 'png')

	if (msg.mentions.users.size > 0) {
		args = args.join(' ').substr(21)
	} else {
		args = args.join(' ')
	}

	if (args.length < 1) {
		return msg.channel.send('What do you want to google search?')
	}
	if (args.length > 47) {
		return msg.channel.send(`Google Search too long. You're ${args.length - 47} characters over the limit!`)
	}

	const avatar = await Jimp.read(avatarurl)
	const avatar2 = avatar.clone()
	const text = args
	const mom = await Jimp.read('./assets/imgen/mom.png')
	const blank = await Jimp.read('./assets/imgen/blank.png')

	avatar.resize(70, 70)
	avatar2.resize(125, 125)
	mom.composite(avatar, 530, 15)
	mom.composite(avatar2, 70, 340)

	const font = await Jimp.loadFont(Jimp.FONT_SANS_16_BLACK)

	blank.resize(275, 200)
	const search = blank.print(font, 0, 0, text)
	search.rotate(335)

	mom.composite(search, 375, 465)
	mom.getBuffer(Jimp.MIME_PNG, async (err, buffer) => {
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