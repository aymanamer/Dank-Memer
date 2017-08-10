exports.run = async function (Memer, msg) {
	let funemoji
	if (msg.channel.permissionsOf(Memer.client.user.id).has('externalEmojis')) {
		funemoji = '<:feelsgreatman:326155536800284673>'
	} else {
		funemoji = ':joy:'
	}
	msg.channel.createMessage({ embed: {
		color: Memer.colors.purple,
		title: 'Commands 💯 👌 🔥',
		description: 'Wanna suggest a command? Use `pls suggest`. You could get credit for it if we make the command!',
		fields: [
			{ name: `${funemoji} Fun Commands`, value: 'asktrump, bother, cowsay, joke, justright, kill, meme, memebox, mock, pupper, pun, shitpost, spin, tweet' },
			{ name: '📷 Image Manipulation', value: 'brazzers, byemom, invert, jail, magik, pride, rip, shit, suggest, trigger, warp' },
			{ name: '🎙 Voice Commands', value: 'airhorn, fart, knock, mlg, nicememe, rickroll, scare, shitsound, stop' },
			{ name: '🔧 Utilities and Information', value: 'clean, custom, data, help, ping, stats' },
			{ name: '🖼 Image Tags', value: 'alone, cry, doge, dolan, godno, kappa, lul, megusta, notsure, pepe, troll, wat ' },
			{ name: '💰 Donor Commands', value: 'patreon, repeat, spam' }
		],
		footer: { text: 'Remember to use pls command, not !pls command or plscommand.' }
	} })
}