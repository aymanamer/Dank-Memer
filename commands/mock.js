exports.run = function (client, msg, args) {

	if (!msg.channel.permissionsFor(client.user.id).has('ATTACH_FILES'))
		return msg.reply('Well shit, there was a permission error! Make sure I have `attach files` so I can do this shit!').catch(() => console.error)

	if (!args[0]) return msg.reply('You gotta give me something to mock :eyes:')

	const dumb = args.join(' ').replace(/c/gi, 'k').replace(/v/gi, 'c')
	const textArray = dumb.toLowerCase().split('')
	const done = textArray.map(capitalizeEven).join('')

	msg.channel.send(done, { files: ['https://pbs.twimg.com/media/DAU-ZPHUIAATuNy.jpg'] })
}

function capitalizeEven (char, index) {
	if (index % 2 === 0)
		return char.toUpperCase()
	else
		return char
}