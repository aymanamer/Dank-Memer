
exports.run = async function (Memer, msg) {
	msg.channel.createMessage({
		embed: {
			color: Memer.colors.lightblue,
			author: { name: 'Come Play Rust!'},
			thumbnail: { url: 'https://cdn.discordapp.com/attachments/357084379371012099/379462443254022144/memerust.png'},
			title: 'Dank Memer\'s Rust Server!',
			description: 'Come play rust with fellow dank memers!',
			footer: { text: 'Wipes monthly.' },
			image: { url: 'https://i.imgur.com/vwhaJ0D.png'}
		}
	})
}

exports.props = {
	name: 'rust',
	usage: '{command}',
	aliases: ['playrust'],
	cooldown: 1000,
	description: 'owo whats this',
	perms: ['embedLinks']
}
