//thx crim #RIP old slothbot commands
exports.run = function (client, msg, args) {
	if (!args[0])
		return msg.channel.send('```css\n>tfw you don\'t give me anything to greentext 👀\n```')
	let text = args.join(' ').split('\n')
	msg.channel.send('```css\n' + text.map(t => '>' + t).join('\n') + '\n```')
}