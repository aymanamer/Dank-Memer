let Jimp = require('jimp')

exports.run = async function (client, msg, args) {
	let avatarurl = msg.mentions.users.size > 0 ? msg.mentions.users.first().displayAvatarURL.replace("gif", "png") : msg.author.displayAvatarURL.replace("gif", "png")
	let avatar = await Jimp.read(avatarurl)
	let brazz = await Jimp.read("./assets/gay.png")
	brazz.opacity(.35)
	brazz.resize(Jimp.AUTO, 350)
	avatar.resize(350, 350)
	avatar.composite(brazz, 0, 0)
	avatar.getBuffer(Jimp.MIME_PNG, (err, buffer) => {
		try {
			msg.channel.sendFile(buffer)
		} catch (e) {
			console.log(e)
			msg.reply('there was an error with this command.')
		}
	})


}
