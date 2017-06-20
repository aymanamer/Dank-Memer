let Jimp = require('jimp')

exports.run = async function (client, msg, args) {
	let avatarurl = msg.mentions.users.size > 0 ? msg.mentions.users.first().displayAvatarURL.replace("gif", "png") : msg.author.displayAvatarURL.replace("gif", "png")
	let authorurl = msg.mentions.users.size > 0 ? msg.author.displayAvatarURL.replace("gif", "png") : client.user.displayAvatarURL.replace("gif", "png")
	let avatar = await Jimp.read(avatarurl)
	let author = await Jimp.read(authorurl)
	let bat = await Jimp.read("./assets/drake.png")

	//	brazz.resize(350, Jimp.AUTO)
	avatar.resize(260, 250)
	author.resize(260, 250)
	bat.resize(500, 500)
	bat.composite(author, 240, 250)
	bat.composite(avatar, 240, 0)
	bat.getBuffer(Jimp.MIME_PNG, (err, buffer) => {
		try {
			msg.channel.sendFile(buffer)
		} catch (e) {
			console.log(e)
			msg.reply('there was an error with this command.')
		}
	})


}