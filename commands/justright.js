const { right } = require('../assets/arrays.json')
const { randomInArray } = require('../utils')

exports.run = function (client, msg) {
	if (!msg.channel.permissionsFor(client.user.id).has('ATTACH_FILES')) {
		return msg.author.send('I don\'t have permission to send pictures in #' + msg.channel.name)
	}

	msg.channel.send({ file: randomInArray(right) })
}
