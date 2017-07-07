const file = Math.floor(Math.random() * 8 + 1)

exports.run = async function (client, msg) {
	if (!msg.channel.permissionsFor(client.user.id).has(['CONNECT', 'SPEAK', 'ADD_REACTIONS']))
		return msg.reply('Well shit, there was a permission error! Make sure I have `add reactions`, connect`, and `speak` so I can do this shit!').catch(() => console.error)

	if (!msg.member.voiceChannel) {
		await msg.react('❌')
		msg.reply('join a voice channel fam')
	} else {
		if (!client.voiceConnections.get(msg.guild.id)) {
			msg.react('📢')
			const conn = await msg.member.voiceChannel.join()
			conn.playFile(`./assets/scare/${file}.opus`)
			conn.player.dispatcher.once('end', () => {
				conn.channel.leave()
			})
		} else {
			await msg.react('😠')
			msg.reply('I only have one mouth, dude. Please wait until the current sound is done or the ear-rape ghost will visit you in your sleep!')
		}
	}
}