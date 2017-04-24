const trump = require('react-trump')
exports.run = function (client, msg, args, config, Discord) {
		let question = args.join(" ")
		let exclamations = 1
		let incquestion = false

		let answer = trump.answer({
			question,
			exclamations,
			incquestion
		})

		msg.channel.sendEmbed(new Discord.RichEmbed()
				.setAuthor(msg.author.username, msg.author.avatarURL)
				.setColor("#3676b3")
				.setDescription(`${question}\nTrump: ${answer}`)
	)
}