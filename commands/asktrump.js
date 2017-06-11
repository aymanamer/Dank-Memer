const trump = require('react-trump')
let trumpers = ["http://www.slate.com/content/dam/slate/articles/news_and_politics/politics/2016/04/160422_POL_Donald-Trump-Act.jpg.CROP.promo-xlarge2.jpg", "https://pixel.nymag.com/imgs/daily/intelligencer/2017/01/24/24-trump-unhinged.w710.h473.jpg", "https://blogs-images.forbes.com/robertwood/files/2016/02/Trump1.jpg", "http://static6.businessinsider.com/image/55918b77ecad04a3465a0a63/nbc-fires-donald-trump-after-he-calls-mexicans-rapists-and-drug-runners.jpg", "http://www.slate.com/content/dam/slate/blogs/the_slatest/2017/04/17/trump_recommended_a_book_on_twitter_today_it_has_no_words/660291014-president-donald-trump-speaks-during-an-event.jpg.CROP.promo-xlarge2.jpg", "http://ichef.bbci.co.uk/news/1024/cpsprodpb/1BC2/production/_88160170_trump-promo.jpg", "http://www.slate.com/content/dam/slate/articles/news_and_politics/politics/2017/01/170112_POL_trump.jpg.CROP.promo-xlarge2.jpg"]

const {
        randomInArray
    } = require('../utils')

exports.run = function (client, msg, args, config, Discord) {

	if (!msg.guild.member(client.user).hasPermission('SEND_MESSAGES')) return msg.author.send('I do not have permission to send messages in that channel! Please fix this to use this command.').catch(console.error)

	if (!args[0]) return msg.reply("You gotta give me something to ask Trump :eyes:")

	let question = args.join(" ")
	let exclamations = 1
	let incquestion = false

	let answer = trump.answer({
		question,
		exclamations,
		incquestion
	})

	msg.channel.send("", {
		embed: new Discord.RichEmbed()
			.setColor("#3676b3")
			.setThumbnail(randomInArray(trumpers))
			.setDescription(`\n${msg.author.username}: ${question}\n\nTrump: ${answer}`)
	})
}