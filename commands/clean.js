exports.run = async function (client, msg) {
	if (!msg.channel.permissionsFor(client.user.id).has(['MANAGE_MESSAGES', 'READ_MESSAGE_HISTORY'])) {
		return msg.reply('Well shit, there was a permission error! Make sure I have `manage messages` and `read message history` so I can do this shit!')
	}

	let messages = await msg.channel.fetchMessages({ limit: 100 })
	messages = messages.array().filter(m => m.author.id === client.user.id)
	messages.length = 10
	await messages.forEach(m => m.delete())
}