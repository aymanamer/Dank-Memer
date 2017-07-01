const { randomInArray } = require('../utils')
const { kill } = require('../assets/arrays.json')

exports.run = function (client, msg, args) {
	if (args.includes('me'))
		return msg.reply('no you can do it yourself. Please tag someone else to kill.')
	if (msg.mentions.users.size === 0)
		return msg.reply('please tag someone to kill.')
	msg.channel.send(randomInArray(kill).replace(/\$mention/g, msg.mentions.users.first().username).replace(/\$author/g, msg.author.username))
}