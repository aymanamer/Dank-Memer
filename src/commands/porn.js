
exports.run = async function (Memer, msg) {
	const votes = await Memer._snek.get('https://discordbots.org/api/bots/270904126974590976/votes?onlyids=1').set('Authorization', Memer.config.orgtoken)
	if (!votes.body.includes(msg.author.id)) {
		msg.channel.createMessage({
			embed: {
				color: Memer.colors.lightblue,
				author: { name: 'OWO whats this?' },
				thumbnail: { url: 'http://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/lock-icon.png' },
				description: 'To be able to see this **NSFW content**, you must vote.\n\n[Click here to vote.](https://discordbots.org/bot/memes)',
				footer: { text: 'Locked Command' }
				
			}
		})
	} else {
		msg.channel.createMessage({
			embed: {
				color: Memer.colors.lightblue,
				author: { name: 'Nice meme.' },
				description: '[Click here to get a REAL porn bot](https://bot.discord.io/boobbot). Thanks for upvoting though!',
				footer: { text: 'Yes, boobbot is holding me hostage. Shhhhh' }

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
