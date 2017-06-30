const trump = require('react-trump')
const { trumpers } = require('../assets/arrays.json')
const { randomInArray } = require('../utils')

exports.run = function (client, msg, args, config, Discord) {
	if (!args[0]) return msg.reply('You gotta give me something to ask Trump :eyes:')

	const question = args.join(' ')
	const exclamations = 1
	const incquestion = false

	const answer = trump.answer({
		question,
		exclamations,
		incquestion
	})

	msg.channel.send({
		embed: new Discord.RichEmbed()
			.setColor('#3676b3')
			.setThumbnail(randomInArray(trumpers))
			.setDescription(`\n${msg.author.username}: ${question}\n\nTrump: ${answer}`)
	})
}