exports.run = async function (client, msg, args, utils, config) {
	if (!config.devs.includes(msg.author.id)) {
		return
	}
	try {
		let user
		if (client.users.get(args[0])) {
			user = client.users.get(args[0])
		} else {
			user = await client.fetchUser(args[0])
		}
		await user.send({
			embed: {
				color: utils.colors.purple,
				title: '📫 You have received a message from the developers!',
				description: args.slice(1).join(' '),
				footer: {
					text: 'To reply, please use pls bother "message to developers"'
				}
			}
		})
		await msg.react('📧')
	} catch (e) {
		await msg.react('❌')
		msg.channel.send(`**Fuck!** *${e.message}*`)
	}
}