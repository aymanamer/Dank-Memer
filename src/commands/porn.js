
exports.run = async function (Memer, msg) {
	const votes = await Memer._snek.get('https://discordbots.org/api/bots/270904126974590976/votes?onlyids=1').set('Authorization', Memer.config.orgtoken)
	if (!votes.body.includes(msg.author.id)) {
		msg.channel.createMessage({
			embed: {
				color: Memer.colors.lightblue,
				author: { name: 'YAY PORN!' },
				description: 'Since porn is not normal for a meme bot, you\'ll have to vote to use it. :(\n[Click here to vote](https://discordbots.org/bot/memes).\nIf your vote button is greyed out, log in on the top right and go back to that link!\n\nVoting helps Dank Memer grow, and the larger the bot is, the better the memes get.'
				
			}
		})
	} else {
		msg.channel.createMessage({
			embed: {
				color: Memer.colors.lightblue,
				author: { name: 'Nice meme.' },
				description: '[Click here to get a REAL porn bot](https://bot.discord.io/boobbot). Thanks for upvoting though!'

			}
		})
	}
		
}

exports.props = {
	name: 'porn',
	usage: '{command}',
	aliases: ['vote', 'upvote'],
	cooldown: 1000,
	description: 'owo whats this',
	perms: ['embedLinks']
}
