const Jimp = require('jimp')

exports.run = async function (client, msg, args) {
	let avatarurl = msg.mentions.users.size > 0 ? msg.mentions.users.first().displayAvatarURL.replace('gif', 'png') : msg.author.displayAvatarURL.replace('gif', 'png')
	if (['jpg', 'jpeg', 'gif', 'png', 'webp'].some(x => args.join(' ').includes(x))) {
		avatarurl = args.join(' ').replace(/gif|webp/g, 'png')
	}

	const avatar = await Jimp.read(avatarurl)
	const brazz = await Jimp.read('./assets/imgen/jail.png')

	avatar.greyscale()
	brazz.resize(Jimp.AUTO, 350)
	avatar.resize(350, 350)
	avatar.composite(brazz, 0, 0)
	avatar.getBuffer(Jimp.MIME_PNG, async (err, buffer) => {
		try {
			await msg.channel.send({files: [{name: 'jail.png', attachment: buffer}]})
		} catch (e) {
			console.log(e)
			await msg.reply('there was an error with this command.')
		}
	})


}