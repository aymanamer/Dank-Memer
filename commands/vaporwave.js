const { vaporize } = require('../utils')

exports.run = async function (client, msg, args) {
	if (!args[0])
		return msg.reply('You gotta give me something to vaporize :eyes:')
	if (vaporize(args.join(' ')).length > 1950)
		return msg.reply('I think we both know that that\'s too long to vaporize :eyes:')
	await msg.channel.send(vaporize(args.join(' ')))
}
