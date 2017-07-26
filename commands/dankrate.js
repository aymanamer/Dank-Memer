const rating = Math.floor(Math.random() * 100 + 1)


exports.run = async function (client, msg) {
	try {
		await msg.channel.send(`I rate you a ${rating}/100 on the dank scale.`)
	} catch (e) {
		console.error(e.stack)
	}
}
