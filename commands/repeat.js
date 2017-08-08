exports.run = async function (Memer, msg, args) {
	if (!Memer.client.guilds.get('281482896265707520').members.has(msg.author.id) || !msg.member.roles.includes('334171428649959447')) {
		return Memer.reply('You need to be on Melmsie\'s server and be a donor to use this command! To join the server, use `pls invite`. To donate, use `pls donate`.', msg)
	}

	if (!args[0]) {
		msg.channel.createMessage('What do you want me to say?')
	} else {
		msg.channel.createMessage(args.join(' '))
	}
}
