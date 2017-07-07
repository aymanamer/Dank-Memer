const { right } = require('../assets/arrays.json')
const { randomInArray } = require('../utils')

exports.run = function (client, msg) {
	if (!msg.channel.permissionsFor(client.user.id).has('ATTACH_FILES'))
		return msg.reply('Well shit, there was a permission error! Make sure I have `attach files` so I can do this shit!').catch(() => console.error)

	msg.channel.send({ file: randomInArray(right) })
}
