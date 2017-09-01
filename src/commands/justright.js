const { right } = require('../assets/arrays.json')

exports.run = async function (Memer, msg) {
	const res = await Memer.snek.get(Memer.randomInArray(right))
	msg.channel.createMessage('', { file: res.body, name: 'justright.png' })
}