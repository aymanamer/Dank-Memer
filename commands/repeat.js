exports.run = async function (Memer, msg, args) {
	if (!Memer.ids.donors.donor1.concat(Memer.ids.donors.donor10, Memer.ids.donors.donor5).includes(msg.author.id)) {
		return msg.channel.send('This is a donator only command! To gain access, you must donate $1 or more here: <https://www.patreon.com/melmsie>', { reply: msg.author })
	}

	if (!args[0]) {
		msg.channel.send('What do you want me to say?')
	} else {
		msg.channel.send(args.join(' '))
	}
}
