exports.run = async function (Memer, msg, args) {
	if (args.length < 1) {
		return msg.channel.createMessage('You need to add some text, try again.')
	}
	if (args.join(' ').length > 100) {
		return msg.channel.createMessage(`Text too long. You're ${args.join(' ').length - 100} characters over the limit!`)
	}
	if (msg.mentions.length > 0) {
		args = args.join(' ').substr(21)
	} else {
		args = args.join(' ')
	}

	const data = await Memer.snek
		.get('http://getame.me/api/ohno')
		.set('Api-Key', Memer.config.imgenKey)
		.set('data-src', args)

	if (data.status === 200) {
		await msg.channel.createMessage('', { file: data.body, name: 'byemom.png' })
	} else {
		msg.channel.createMessage(`Error: ${data.text}`)
	}

}