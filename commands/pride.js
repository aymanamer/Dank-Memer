const Jimp = require('jimp')

exports.run = async function (client, msg) {

	if (!msg.channel.permissionsFor(client.user.id).has('ATTACH_FILES'))
		return msg.reply('Well shit, there was a permission error! Make sure I have `attach files` so I can do this shit!').catch(() => console.error)

	const avatarurl = (msg.mentions.users.size > 0 ? msg.mentions.users.first().displayAvatarURL : msg.author.displayAvatarURL).replace('gif', 'png')
	const avatar = await Jimp.read(avatarurl)
	const brazz = await Jimp.read('./assets/imgen/gay.png')
	brazz.opacity(.35)
	brazz.resize(Jimp.AUTO, 350)
	avatar.resize(350, 350)
	avatar.composite(brazz, 0, 0)
	avatar.getBuffer(Jimp.MIME_PNG, async(err, buffer) => {
		try {
			await msg.channel.send({
				files: [{
					name: 'pride.png',
					attachment: buffer
				}]
			})
		} catch (e) {
			await msg.channel.send(`Error: ${e.message}`)
		}
	})

}