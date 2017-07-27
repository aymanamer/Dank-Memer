exports.run = async function (client, msg) {
	try {
		await msg.channel.send('no')
	} catch (e) {
		console.log(`${e.message}`)
	}
}
