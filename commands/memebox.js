const meme = (str) => Array(str.length).fill(true).map((_, i) => !i || i === str.length - 1 ? !i ? str.split('').join(' ') : str.split('').reverse().join(' ') : str[i] + ' '.repeat(str.length * 2 - 3) + str[str.length - 1 - i]).join('\n')
exports.run = function (Memer, msg, args) {
	if (!args[0]) {
		return Memer.reply('You gotta give me something to make my meme box out of :eyes:', msg)
	}
	if (args.join(' ').length > 30) {
		return msg.channel.createMessage(':warning: text cannot be bigger than my dick! (30 characters)')
	}
	msg.channel.createMessage(Memer.codeblock(meme(args.join(' '))))
}