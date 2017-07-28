exports.run = async function (client, msg, args) {
	if (!client.ids.donors.donor1.concat(client.ids.donors.donor10, client.ids.donors.donor5).includes(msg.author.id)) {
		return msg.channel.send('This is a donator only command! To gain access, you must donate $1 or more here: <https://www.patreon.com/melmsie>', { reply: msg.author })
	}

	try {
		if (!args[0]) {
			await msg.channel.send('What do you want me to say?')
		}
		else {
			await msg.channel.send(args.join(' '))
		}
	} catch (e) {
		await msg.channel.send(e.message, { code: true })
	}
}
