const Jimp = require('jimp')

exports.run = async function (Memer, msg, args) {

	let avatarurl = msg.mentions.length > 0 ? msg.mentions[0].staticAvatarURL : msg.author.staticAvatarURL
	if (['jpg', 'jpeg', 'gif', 'png', 'webp'].some(x => args.join(' ').includes(x))) {
		avatarurl = args.join(' ').replace(/gif|webp/g, 'png')
	}

	const bad = await Jimp.read(avatarurl)
	const template = await Jimp.read('./assets/imgen/ban.png')


	bad.resize(350, 350)

	template.composite(bad, 93, 365)
	template.getBuffer(Jimp.MIME_PNG, async (err, buffer) => {
		try {
			await msg.channel.createMessage('', {
				file: buffer, name: 'ban.png'
			})
		} catch (err) {
			msg.channel.createMessage(`Error: ${err.message}`)
		}
	})
}

exports.props = {
	name: 'ban',
	usage: '{command}',
	aliases: ['banne'],
	cooldown: 3000,
	description: 'ban this nerd pls'
}