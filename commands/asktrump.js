const trump = require('react-trump')
const { trumpers } = require('../assets/arrays.json')
const { randomInArray } = require('../utils')

exports.run = function (client, msg, args, config, Discord) {
	if (!args[0]) return msg.reply('You gotta give me something to ask Trump :eyes:')

	let question = args.join(' ')
	let exclamations = 1
	let incquestion = false

	let answer = trump.answer({
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