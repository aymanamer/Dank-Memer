/*
let Jimp = require('jimp')

exports.run = async function (client, msg, args) {
	let avatarurl = msg.mentions.users.size > 0 ? msg.mentions.users.first().displayAvatarURL.replace("gif", "png") : msg.author.displayAvatarURL.replace("gif", "png")
	let avatar = await Jimp.read(avatarurl)
	let brazz = await Jimp.read("./assets/brazzers.png")
	
	brazz.resize(Jimp.AUTO, 100)
	avatar.resize(400, Jimp.AUTO)
	avatar.composite(brazz, 200, 225)
	avatar.getBuffer(Jimp.MIME_PNG, (err, buffer) => {
		try {
			msg.channel.sendFile(buffer)
		} catch (e) {
			console.log(e)
			msg.reply('there was an error with this command.')
		}
	})


}

*/