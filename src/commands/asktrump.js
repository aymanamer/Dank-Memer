const trump = require('react-trump')
const { trumpers } = require('../assets/arrays.json')

const exclamations = 1
const incquestion = false

exports.run = async function (Memer, msg, args) {
	if (!args[0]) {
		return Memer.reply('You gotta give me something to ask Trump :eyes:', msg)
	}

	const question = args.join(' ')
	const answer = await trump.answer({
		question,
		exclamations,
		incquestion
	})

	msg.channel.createMessage({
		embed: {
			color: Memer.colors.lightblue,
			thumbnail: { url: Memer.randomInArray(trumpers)},
			description: `\n${msg.author.username}: ${question}\n\nTrump: ${answer}`
		}
	})
}