const snekfetch = require('snekfetch')
exports.run = async function (client, msg) {
	getCatPic(msg)
}

async function getCatPic(msg) {
	const data = await snekfetch.get('https://random.cat/meow')
	if (data.body.file.includes('.mp4')) {
		return getCatPic(msg)
	}

	await msg.channel.send({
		embed: {
			title: '😻',
			color: '5881576',
			image: {
				url: data.body.file
			},
			footer: {
				text: `Requested by ${msg.author.tag}`
			}
		}
	})
}