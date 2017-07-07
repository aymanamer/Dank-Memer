const trump = require('react-trump')
const {
	trumpers
} = require('../assets/arrays.json')
const {
	randomInArray
} = require('../utils')

const exclamations = 1
const incquestion = false


exports.run = async function (client, msg, args, config, Discord) {

	if (!args[0]) return msg.reply('You gotta give me something to ask Trump :eyes:')

	const question = args.join(' ')

	const answer = await trump.answer({
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