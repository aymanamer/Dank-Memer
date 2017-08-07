const cowsay = require('cowsay')

exports.run = async function (Memer, msg, args) {
	if (!args[0]) {
		return Memer.reply('You gotta give me something to say :eyes:', msg)
	}
	msg.channel.createMessage(Memer.codeblock(cowsay.say({ text: args.join(' '), e: 'oO', T: 'U' })))
}