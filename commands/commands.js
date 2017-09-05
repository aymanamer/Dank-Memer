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
		description: 'Henlo, we removed commands. Sorry, but not sorry.',
		fields: [
			{ name: `${funemoji} Fun Commands`, value: 'asktrump, greentext, joke, justright, kill, meme, memegen, mock, pupper, pun, shitpost, spin' },
			{ name: '📷 Image Manipulation', value: 'batslap, brazzers, byemom, invert, jail, needsmorejpeg, magik, pride, rip, shit, spank, trigger, warp' },
			{ name: '🔧 Utilities and Information', value: 'disable, enable, help, ping, prefix, stats' },
			{ name: '🖼 Image Tags', value: 'alone, doge, dolan, godno, kappa, lul, megusta, notsure, pepe, troll, wat ' },
			{ name: '💰 Donor Commands', value: 'patreon, repeat, spam, tweet' }
		],
		footer: { text: 'Remember to use pls command, not !pls command or plscommand.' }
	} })
}