const { gooby } = require('../assets/arrays.json')

exports.run = async function (Memer, msg) {
	const goober = await Memer.snek.get(Memer.randomInArray(gooby))
	msg.channel.createMessage('', { file: goober.body, name: 'gooby.png' })
}