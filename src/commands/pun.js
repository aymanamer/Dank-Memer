exports.run = async function (Memer, msg) {
	const joek = await Memer._snek
		.get('https://icanhazdadjoke.com/')
		.set('Accept', 'application/json')
	msg.channel.createMessage(joek.body.joke)
}

exports.props = {
	name        : 'pun',
	usage       : '{command}',
	aliases     : ['dadjoke'],
	cooldown    : 1000,
	description : 'Are they dad jokes, or are they puns? Is there even a difference?'
}