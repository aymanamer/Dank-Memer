exports.run = async function (Memer, msg) {
	const avatarurl = (msg.mentions.length > 0 ? msg.mentions[0].staticAvatarURL : msg.author.staticAvatarURL).replace('gif', 'png')
	const authorurl = (msg.mentions.length > 0 ? msg.author.staticAvatarURL : Memer.client.user.staticAvatarURL).replace('gif', 'png')

	const data = await Memer.snekfetch
		.get('http://get-ur-me.me/api/batslap')
		.set('Api-Key', Memer.config.imgenKey)
		.set('data-src', JSON.stringify([`${avatarurl}`, `${authorurl}`]))

	if (data.status === 200) {
		await msg.channel.createMessage('', { file: data.body, name: 'hi.png' })
	} else {
		msg.channel.createMessage(`Error: ${data.text}`)
	}
}