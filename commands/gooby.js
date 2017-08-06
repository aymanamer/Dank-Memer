const { gooby } = require('../assets/arrays.json')

exports.run = async function (Memer, msg) {
	const res = await Memer.snekfetch.get(Memer.randomInArray(gooby))
	msg.channel.createMessage('', { file: res.body, name: 'gooby.png' })
}