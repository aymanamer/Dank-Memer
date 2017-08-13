exports.run = async function (Memer, msg, args) {
	if (!Memer.isDonator(msg.author.id)) {
		return Memer.reply('You need to both be on Melmsie\'s server and be a donor to use this command! To join the server, use `pls invite`. To donate, use `pls donate`.', msg)
	}

	if (!args[0]) {
		msg.channel.createMessage('What do you want me to say?')
	} else {
		msg.channel.createMessage(args.join(' '))
	}
}
