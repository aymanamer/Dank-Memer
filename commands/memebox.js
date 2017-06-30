const meme = (str) => Array(str.length).fill(true).map((_, i) => (!i || i === str.length - 1) ? (!i) ? str.split('').join(' ') : str.split('').reverse().join(' ') : (str[i] + ' '.repeat(str.length * 2 - 3) + str[str.length - 1 - i])).join('\n')
exports.run = function (client, msg, args) {
	args = msg.cleanContent.split(' ').slice(2).join(' ')
	if (!args[0])
		return msg.reply('You gotta give me something to make my meme box out of :eyes:')
	if (args.length > 30)
		return msg.channel.send(':warning: text cannot be bigger than my dick! (30 characters)')
	msg.channel.send('```\n' + meme(args) + '\n```')
}