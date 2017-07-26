const Jimp = require('jimp')

exports.run = async function (client, msg, args) {
	let avatarurl = msg.mentions.users.size > 0 ? msg.mentions.users.first().displayAvatarURL.replace('gif', 'png') : msg.author.displayAvatarURL.replace('gif', 'png')
	const authorurl = msg.mentions.users.size > 0 ? msg.author.displayAvatarURL.replace('gif', 'png') : client.user.displayAvatarURL.replace('gif', 'png')
	if (['jpg', 'jpeg', 'gif', 'png', 'webp'].some(x => args.join(' ').includes(x))) {
		avatarurl = args.join(' ').replace(/gif|webp/g, 'png')
	}
	const avatar = await Jimp.read(avatarurl)
	const author = await Jimp.read(authorurl)
	const bat = await Jimp.read('./assets/imgen/batman.jpg')

	avatar.resize(150, 150)
	author.resize(130, 130)
	bat.resize(670, 400)
	bat.crop(0, 0, 670, 400)
	bat.composite(avatar, 390, 215)
	bat.composite(author, 240, 75)
	bat.getBuffer(Jimp.MIME_PNG, async (err, buffer) => {
		try {
			await msg.channel.send({ files: [{ name: 'bat.png', attachment: buffer }] })
		} catch (e) {
			console.log(e)
			await msg.reply('there was an error with this command.')
		}
	})


}