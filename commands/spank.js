exports.run = async function (Memer, msg, args) {
	let avatarurl = msg.mentions.length > 0 ? msg.mentions[0].staticAvatarURL : msg.author.staticAvatarURL
	if (['jpg', 'jpeg', 'gif', 'png', 'webp'].some(x => args.join(' ').includes(x))) {
		avatarurl = args.join(' ').replace(/gif|webp/g, 'png')
	}

	const data = await Memer.snek
		.get('http://get-ur-me.me/api/byemom')
		.set('Api-Key', Memer.config.imgenKey)
		.set('data-src', ['https://cdn.discordapp.com/attachments/343527586971779087/343828761365708801/brazzers.png', 'https://cdn.discordapp.com/attachments/343527586971779087/343828761365708801/brazzers.png'])

	if (data.status === 200) {
		await msg.channel.createMessage('', { file: data.body, name: 'spank.png' })
	} else {
		msg.channel.createMessage(`Error: ${data.text}`)
	}
}