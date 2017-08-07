exports.run = async function (client, msg) {
	try {
		await msg.channel.createMessage('no')
	} catch (e) {
		console.log(`${e.message}`)
	}
}
