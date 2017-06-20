let Jimp = require('jimp')

exports.run = async function (client, msg, args) {
	let avatarurl = msg.mentions.users.size > 0 ? msg.mentions.users.first().displayAvatarURL.replace("gif", "png") : msg.author.displayAvatarURL.replace("gif", "png")
	let authorurl = msg.mentions.users.size > 0 ? msg.author.displayAvatarURL.replace("gif", "png") : client.user.displayAvatarURL.replace("gif", "png")
	let avatar = await Jimp.read(avatarurl)
	let author = await Jimp.read(authorurl)
	let bat = await Jimp.read("./assets/spank.jpg")

	//	brazz.resize(350, Jimp.AUTO)
	avatar.resize(120, 120)
	author.resize(140, 140)
	bat.resize(500, 500)
	bat.composite(avatar, 350, 220)
	bat.composite(author, 225, 5)
	bat.getBuffer(Jimp.MIME_PNG, (err, buffer) => {
		try {
			msg.channel.sendFile(buffer)
		} catch (e) {
			console.log(e)
			msg.reply('there was an error with this command.')
		}
	})


}