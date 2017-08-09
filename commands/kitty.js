exports.run = async function (Memer, msg) {
	getCatPic(msg)
}

async function getCatPic(Memer, msg) {
	const data = await Memer.snek.get('https://random.cat/meow')
	if (data.body.file.includes('.mp4')) {
		return getCatPic(msg)
	}

	msg.channel.createMessage({ embed: {
		title: '😻',
		color: parseInt('59BEE8', 16),
		image: { url: data.body.file },
		footer: { text: `Requested by ${msg.author.username}#${msg.author.discriminator}` }
	}})
}