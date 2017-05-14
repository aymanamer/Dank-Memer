const trump = require('react-trump')
exports.run = function (client, msg, args, config, Discord) {

	if (!args[0]) return msg.reply("You gotta give me something to ask Trump :eyes:")

		let question = args.join(" ")
		let exclamations = 1
		let incquestion = false

		let answer = trump.answer({
			question,
			exclamations,
			incquestion
		})

		msg.channel.send("", {embed: new Discord.RichEmbed()
				.setAuthor(msg.author.username, msg.author.avatarURL)
				.setColor("#3676b3")
				.setDescription(`${question}\nTrump: ${answer}`)
		})
}