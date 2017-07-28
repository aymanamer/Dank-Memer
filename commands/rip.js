const Jimp = require('jimp')

exports.run = async function (client, msg, args) {
	let avatarurl = msg.mentions.users.size > 0 ? msg.mentions.users.first().displayAvatarURL.replace('gif', 'png') : msg.author.displayAvatarURL.replace('gif', 'png')

	if (['jpg', 'jpeg', 'gif', 'png', 'webp'].some(x => args.join(' ').includes(x))) {
		avatarurl = args.join(' ').replace(/gif|webp/g, 'png')
	}
	const avatar = await Jimp.read(avatarurl)
	const bat = await Jimp.read('./assets/imgen/rip.png')

	avatar.resize(300, 300)
	bat.resize(642, 806)
	bat.composite(avatar, 175, 385)
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