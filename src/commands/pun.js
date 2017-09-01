exports.run = async function (Memer, msg) {
	const joek = await Memer.snek
		.get('https://icanhazdadjoke.com/')
		.set('Accept', 'application/json')
	msg.channel.createMessage(joek.body.joke)
}