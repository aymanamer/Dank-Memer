const { right } = require('../assets/arrays.json')

exports.run = function (client, msg, args, utils) {
	if (!msg.channel.permissionsFor(client.user.id).has('ATTACH_FILES')) {
		return msg.reply('Well shit, there was a permission error! Make sure I have `attach files` so I can do this shit!').catch(() => console.error)
	}

	msg.channel.send({ file: utils.randomInArray(right) })
}
