const file = Math.floor(Math.random() * 5 + 1)

exports.run = async function (client, msg) {
	if (!msg.channel.permissionsFor(client.user.id).has(['CONNECT', 'SPEAK', 'ADD_REACTIONS'])) {
		return msg.reply('Well shit, there was a permission error! Make sure I have `add reactions`, connect`, and `speak` so I can do this shit!')
	}
	if (!msg.member.voiceChannel) {
		await msg.react('❌')
		msg.reply('join a voice channel fam')
	} else {
		if (!client.voiceConnections.get(msg.guild.id)) {
			try {
				msg.react('😅')
				const conn = await msg.member.voiceChannel.join()
				conn.playFile(`./assets/farts/${file}.mp3`)
				conn.player.dispatcher.once('end', () => {
					conn.channel.leave()
				})
			} catch (e) {
				console.log(`fart error: ${e.message}`)
			}
		} else {
			await msg.react('❌')
			msg.reply('I only have one butthole, dude. Please wait until the current sound is done or the ear-rape ghost will visit you in your sleep!')
		}
	}
}