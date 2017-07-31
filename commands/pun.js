const snekfetch = require('snekfetch')

exports.run = async function (client, msg) {
	const joek = await snekfetch
		.get('https://icanhazdadjoke.com/')
		.set('Accept', 'application/json')
	await msg.channel.send(joek.body.joke)
}