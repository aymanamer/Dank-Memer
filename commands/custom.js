exports.run = async function (client, msg, args, utils) {
	try {
		await msg.channel.send({
			embed: {
				color: utils.colors.green,
				title: 'Custom Commands',
				description: 'All of these commands are rewards for either donating or winning a giveaway!',
				fields: [
					{ 'name': 'pls doit', 'value': 'by `Swiggity#7716`' },
					{ 'name': 'pls swiggity', 'value': 'by `Swiggity#7716`' },
					{ 'name': 'pls yeahboi', 'value': 'by `Moboly#1605`' },
					{ 'name': 'pls dankrate', 'value': 'by `LoverofSporks#2433`' },
					{ 'name': 'pls suprise', 'value': 'by `Liam#7475`' }
				]
			}
		})
	} catch (e) {
		console.log(`${e.message}`)
	}

}