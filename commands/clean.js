exports.run = async function (client, msg) {
	if (!msg.channel.permissionsFor(msg.author.id).has('MANAGE_MESSAGES'))
		return msg.author.send('You don\'t have permission to send manage messages #' + msg.channel.name).catch(console.error)

	let messages = await msg.channel.fetchMessages({ limit: 100 })
	messages = messages.array().filter(m => m.author.id === client.user.id)
	messages.length = 10
	messages.forEach(m => m.delete().catch())
}