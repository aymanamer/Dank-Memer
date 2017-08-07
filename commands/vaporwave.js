exports.run = function (Memer, msg, args) {
	if (!args[0]) {
		return Memer.reply('You gotta give me something to vaporize :eyes:', msg)
	}
	msg.channel.createMessage(Memer.vaporize(args.join(' ')))
}