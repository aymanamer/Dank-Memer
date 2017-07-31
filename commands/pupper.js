const snekfetch = require('snekfetch')
exports.run = async function (client, msg) {
	getDogPic(msg)
}

async function getDogPic(msg) {
	const data = await snekfetch.get('https://random.dog/woof.json')
	if (data.body.url.includes('.mp4')) {
		return getDogPic(msg)
	}

	await msg.channel.send({
		embed: {
			title: '🐶',
			color: '5881576',
			image: {
				url: data.body.url
			},
			footer: {
				text: `Requested by ${msg.author.tag}`
			}
		}
	})
}