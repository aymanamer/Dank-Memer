exports.run = async function (Memer, msg, args) {
	if (!msg.channel.permissionsOf(Memer.client.user.id).has('readMessageHistory')) {
		return Memer.reply('Well shit, there was a permission error! Make sure I have `read message history` so I can do this shit!', msg)
	}

	let messages = await msg.channel.getMessages(100)
	messages = messages.filter(m => m.author.id === Memer.client.user.id)
	messages.length = args[0] || 10
	if (msg.channel.permissionsOf(Memer.client.user.id).has('manageMessages')) {
		msg.channel.deleteMessages(messages.map(m => m.id))
	} else {
		messages.forEach(m => m.delete())
	}
}