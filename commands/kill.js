const { kill } = require('../assets/arrays.json')

exports.run = async function (Memer, msg, args) {
	if (args[0] === 'me') {
		return Memer.reply('no you can do it yourself. Please tag someone else to kill.', msg)
	}
	if (!msg.mentions[0]) {
		return Memer.reply('please tag someone to kill.', msg)
	}
	msg.channel.createMessage(Memer.randomInArray(kill)
		.replace(/\$mention/g, msg.mentions[0].username)
		.replace(/\$author/g, msg.author.username))
}