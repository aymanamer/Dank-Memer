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
		description: 'Try out the new commands! Batslap, disable, enable, memegen, ohno, pony, prefix, search, and spank!',
		fields: [
			{ name: `${funemoji} Fun Commands`, value: 'asktrump, bother, cowsay, joke, justright, kill, meme, memebox, memegen, mock, pupper, pun, shitpost, spin' },
			{ name: '📷 Image Manipulation', value: 'batslap, brazzers, byemom, invert, jail, magik, ohno, pony, pride, rip, search, shit, spank, suggest, trigger, warp' },
			{ name: '🎙 Voice Commands', value: 'airhorn, fart, knock, mlg, nicememe, rickroll, scare, shitsound, stop' },
			{ name: '🔧 Utilities and Information', value: 'clean, custom, data, disable, enable, help, ping, prefix, stats' },
			{ name: '🖼 Image Tags', value: 'alone, cry, doge, dolan, godno, kappa, lul, megusta, notsure, pepe, troll, wat ' },
			{ name: '💰 Donor Commands', value: 'patreon, repeat, spam, tweet' }
		],
		footer: { text: 'Remember to use pls command, not !pls command or plscommand.' }
	} })
}