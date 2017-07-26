const Jimp = require('jimp')

exports.run = async function (client, msg) {

	if (!msg.channel.permissionsFor(client.user.id).has('ATTACH_FILES')) {
		return msg.reply('Well shit, there was a permission error! Make sure I have `attach files` so I can do this shit!').catch(() => console.error)
	}
	const avatarurl = (msg.mentions.users.size > 0 ? msg.mentions.users.first().displayAvatarURL : msg.author.displayAvatarURL).replace('gif', 'png')
	const avatar = await Jimp.read(avatarurl)
	avatar.invert()
	avatar.getBuffer(Jimp.MIME_PNG, async(err, buffer) => {
		try {
			await msg.channel.send({
				files: [{
					name: 'inverted.png',
					attachment: buffer
				}]
			})
		} catch (e) {
			msg.channel.send(`Error: ${e.message}`)
		}
	})
}