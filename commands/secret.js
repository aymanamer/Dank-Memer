exports.run = async function (client, msg, args, utils) {
	try {
		await msg.channel.send({
			embed: {
				color: utils.colors.lightblue,
				title: 'The fuck is this?',
				description: 'Congrats, you found some commands that are hidden! Either these are being slowly phased out of use, they are beta commands, or commands that melmsie just does not tell people about!',
				fields: [
					{ name: 'pls emoji', value: 'grabs a random emoji from a random server'}
				]
			}
		})
	} catch (e) {
		console.error(e.message)
	}

}