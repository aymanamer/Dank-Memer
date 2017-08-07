const servers = [
//	'281482896265707520',
	'264445053596991498',
	'110373943822540800'
]
exports.run = async function (Memer, msg, args) {
	if (servers.includes(msg.channel.guild.id)) {
		return msg.channel.createMessage('Sorry, Melmsie likes this server too much to let you spam.')
	}

	if (Memer.ids.donors.donor5.concat(Memer.ids.donors.donor10).includes(msg.author.id)) {
		if (!args[0]) {
			return Memer.reply('What do you want me to spam?', msg)
		}

		const intervalFunc = () => {
			msg.channel.createMessage(args.join(' '))
		}
		const haha = setInterval(intervalFunc, 1250)
		setTimeout(function () { // eslint-disable-line prefer-arrow-callback
			clearInterval(haha)
		}, 10000)
	} else {
		return Memer.reply('This is a donator only command! To gain access, you must donate $5 or more here: <https://www.patreon.com/melmsie>', msg)
	}
}
