exports.run = function (client, msg, args, utils) {
	msg.channel.send({
		embed: {
			title: 'Donate to Dank Memer on Patreon!',
			description: 'For donating at any tier on patreon, you can get a ton of rewards!',
			url: 'https://www.patreon.com/melmsie',
			color: utils.lightblue,
			footer: { text: 'Donating will always be optional, and always appreciated! :D' },
		}})
}
