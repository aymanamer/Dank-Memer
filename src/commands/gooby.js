const { gooby } = require('../assets/arrays.json')

exports.run = async function (Memer, msg) {
	const goober = await Memer._snek.get(Memer.randomInArray(gooby))
	msg.channel.createMessage('', { file: goober.body, name: 'gooby.png' })
}

exports.props = {
	name        : 'gooby',
	usage       : '{command}',
	aliases     : [],
	cooldown    : 1,
	description : ''
}