exports.run = async function (Memer, msg) {
	const avatarurl = msg.mentions.length > 0 ? msg.mentions[0].staticAvatarURL : msg.author.staticAvatarURL
	const authorurl = msg.mentions.length > 0 ? msg.author.staticAvatarURL : Memer.client.user.staticAvatarURL

	const data = await Memer.snekfetch
		.get('http://get-ur-me.me/api/invert')
		.set('Api-Key', Memer.config.imgenKey)
		.set('data-src', authorurl)

	if (data.status === 200) {
		await msg.channel.createMessage('', { file: data.body, name: 'hi.png' })
	} else {
		msg.channel.createMessage(`Error: ${data.text}`)
	}
}