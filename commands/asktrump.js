const trump = require('react-trump')
const {
	trumpers
} = require('../assets/arrays.json')


const exclamations = 1
const incquestion = false

exports.run = async function (client, msg, args, utils) {

	if (!args[0]) {
		return msg.reply('You gotta give me something to ask Trump :eyes:')
	}

	const question = args.join(' ')

	const answer = await trump.answer({
		question,
		exclamations,
		incquestion
	})

	msg.channel.send({
		embed: {
			color: utils.colors.lightblue,
			thumbnail: { url: utils.randomInArray(trumpers)},
			description: `\n${msg.author.username}: ${question}\n\nTrump: ${answer}`
		}
	})
}