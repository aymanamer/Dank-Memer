exports.run = function (Memer, msg) {
	msg.channel.send({ embed: {
		color: Memer.colors.lightblue,
		title: 'The fuck is this?',
		description: 'Congrats, you found some commands that are hidden! Either these are being slowly phased out of use, they are beta commands, or commands that melmsie just does not tell people about!',
		fields: [
			{ name: 'pls emoji', value: 'grabs a random emoji from a random server' }
		]
	} })
}