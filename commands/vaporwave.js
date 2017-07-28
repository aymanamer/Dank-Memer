const { vaporize } = require('../utils')

exports.run = async function (client, msg, args) {
	if (!args[0]) {
		return msg.reply('You gotta give me something to vaporize :eyes:')
	}
	await msg.channel.send(vaporize(args.join(' ')))
}
