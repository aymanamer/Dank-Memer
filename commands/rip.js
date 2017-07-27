const Jimp = require('jimp')

exports.run = async function (client, msg, args) {
	let avatarurl = msg.mentions.users.size > 0 ? msg.mentions.users.first().displayAvatarURL.replace('gif', 'png') : msg.author.displayAvatarURL.replace('gif', 'png')

	if (['jpg', 'jpeg', 'gif', 'png', 'webp'].some(x => args.join(' ').includes(x))) {
		avatarurl = args.join(' ').replace(/gif|webp/g, 'png')
	}
/*
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
*/
	//const text = args
	const avatar = await Jimp.read(avatarurl)
	const bat = await Jimp.read('./assets/imgen/rip.png')

	avatar.resize(300, 300)
	bat.resize(642, 806)
	bat.composite(avatar, 175, 385)
	//const font = await Jimp.loadFont(Jimp.FONT_SANS_64_BLACK)
	//bat.print(font, 200, 650, text, 350)
	bat.getBuffer(Jimp.MIME_PNG, async(err, buffer) => {
		try {
			await msg.channel.send({
				files: [{
					name: 'rip.png',
					attachment: buffer
				}]
			})
		} catch (e) {
			console.log(e)
			await msg.reply('there was an error with this command.')
		}
	})


}