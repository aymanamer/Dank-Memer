const Jimp = require('jimp')

exports.run = async function (client, msg) {

	if (!msg.channel.permissionsFor(client.user.id).has('ATTACH_FILES'))
		return msg.reply('Well shit, there was a permission error! Make sure I have `attach files` so I can do this shit!').catch(() => console.error)

	const avatarurl = (msg.mentions.users.size > 0 ? msg.mentions.users.first().displayAvatarURL : msg.author.displayAvatarURL).replace('gif', 'png')
	const authorurl = msg.mentions.users.size > 0 ? msg.author.displayAvatarURL.replace('gif', 'png') : client.user.displayAvatarURL.replace('gif', 'png')

	const [avatar, author] = await Promise.all([
		Jimp.read(avatarurl),
		Jimp.read(authorurl)
	])
	const spank = await Jimp.read('./assets/imgen/spank.jpg')
	avatar.resize(120, 120)
	author.resize(140, 140)
	spank.resize(500, 500)
	spank.composite(avatar, 350, 220)
	spank.composite(author, 225, 5)
	spank.getBuffer(Jimp.MIME_PNG, async(err, buffer) => {
		try {
			await msg.channel.send({
				files: [{
					name: 'spank.png',
					attachment: buffer
				}]
			})
		} catch (e) {
			msg.channel.send(`Error: ${e.message}`)
		}

	})


}