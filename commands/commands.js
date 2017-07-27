exports.run = async function (client, msg, args, utils) {
	if (!msg.channel.permissionsFor(client.user.id).has('USE_EXTERNAL_EMOJIS')) {
		return msg.reply('Well shit, there was a permission error! Make sure I have `use external emojis` so I can do this shit!').catch(() => console.error)
	}

	try {
		await msg.channel.send({
			embed: {
				color: utils.colors.lightblue,
				title: 'Commands 💯 👌 🔥',
				description: '\nTry the new commands! `fart`, `shit`, and `rip`\n',
				fields: [
					{ 'name': '<:feelsgreatman:326155536800284673> Fun Commands', 'value': 'annoy, asktrump, bother, cowsay, joke, justright, kill, meme, memebox, mock, pupper, pun, shitpost, spin, tweet' },
					{ 'name': '📷 Image Manipulation', 'value': 'batslap, brazzers, byemom, invert, jail, magik, pride, rip, shit, spank, trigger, warp' },
					{ 'name': '🎙 Voice Commands', 'value': 'airhorn, fart, knock, mlg, nicememe, rickroll, scare, shitsound, stop' },
					{ 'name': '🔧 Utilities and Information', 'value': 'clean, custom, data, help, ping, stats' },
					{ 'name': '💰 Donor Commands', 'value': 'doge, dolan, fuckyeah, kappa, kappa pride, lenny, lul, megusta, patreon, repeat, spam, thisisfine, troll' }
				],
				footer: { text: 'Remember do use pls command, not !pls command or plscommand.' }
			}
		})
	} catch (e) {
		console.log(`${e.message}`)
	}

}