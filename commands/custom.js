exports.run = async function (Memer, msg) {
	msg.channel.createMessage({ embed: {
		color: Memer.colors.green,
		title: 'Custom Commands',
		description: 'All of these commands are rewards for either donating or winning a giveaway!',
		fields: [
			{ 'name': 'pls doit', 		'value': 'by `Swiggity#7716`' },
			{ 'name': 'pls swiggity', 	'value': 'by `Swiggity#7716`' },
			{ 'name': 'pls yeahboi', 	'value': 'by `Moboly#1605`' },
			{ 'name': 'pls dankrate', 	'value': 'by `LoverofSporks#2433`' },
			{ 'name': 'pls suprise', 	'value': 'by `Liam#7475`' }
		],
		footer: { text: 'You can become a donator at http://patreon.com/melmsie.' }
	}})
}