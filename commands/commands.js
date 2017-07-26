exports.run = function (client, msg, args, config, EmbedBuilder) {
	if (!msg.channel.permissionsFor(client.user.id).has('USE_EXTERNAL_EMOJIS')) {
		return msg.reply('Well shit, there was a permission error! Make sure I have `use external emojis` so I can do this shit!').catch(() => console.error)
	}

	msg.channel.send({
		embed: new EmbedBuilder()
			.setColor('#3676b3')
			.setAuthor('Commands 💯 👌 🔥')
			.setDescription('Get donor perks [here](https://www.patreon.com/melmsie)')
			.addField('<:feelsgreatman:326155536800284673> Memey Commands', 'annoy, asktrump, bother, cowsay, joke, justright, kill, meme, memebox, mock, pupper, pun, shitpost, spin, tweet')
			.addField('💰 Donor Commands', 'custom, doge, dolan, fuckyeah, kappa, kappa pride, lenny, lul, megusta, patreon, repeat, spam, thisisfine, troll')
			.addField('📷 Image Manipulation', 'batslap, brazzers, byemom, invert, jail, magik, pride, spank, trigger, warp')
			.addField('🎙 Voice Commands', 'airhorn, knock, mlg, nicememe, rickroll, scare, shitsound, stop')
			.addField('🔧 Utilities and Information', 'clean, help, ping, stats')
			.setFooter('Special thanks to Aetheryx. Credit for pls trigger goes to stupidcat.')
	}).catch((err) => console.log(err.message))
}