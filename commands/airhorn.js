const file = Math.floor(Math.random() * 2 + 1)
exports.run = async function (Memer, msg) {
	if (!msg.member.voiceState.channelID) {
		await msg.addReaction('❌')
		return Memer.reply('join a voice channel fam', msg)
	}

	if (!Memer.client.getChannel(msg.member.voiceState.channelID).permissionsOf(Memer.client.user.id).has('voiceConnect') ||
		!Memer.client.getChannel(msg.member.voiceState.channelID).permissionsOf(Memer.client.user.id).has('voiceSpeak')) {
		return Memer.reply('Well shit, there was a permission error! Make sure I have `connect` and `speak` so I can do this shit!', msg)
	}

	if (!Memer.client.voiceConnections.get(msg.channel.guild.id)) {
		msg.addReaction('👍')
		const conn = await Memer.client.joinVoiceChannel(msg.member.voiceState.channelID)
		conn.play(`./assets/horns/${file}.opus`)
		conn.on('end', async() => {
			await Memer.client.leaveVoiceChannel(conn.channelID)
			if (Memer.client.voiceConnections.get(msg.channel.guild.id)) {
				console.error(`${Date} hey airhorn.js fucked up`)
				await Memer.client.voiceConnections.get(msg.channel.guild.id).disconnect()
				await Memer.client.voiceConnections.get(msg.channel.guild.id)._destroy()
				await Memer.client.voiceConnections.remove(Memer.client.voiceConnections.get(msg.guild.id))
			}
		})
		conn.on('error', async(err) => {
			console.error(`${Date} hey airhorn.js fucked up`)
			msg.channel.createMessage('ur voice is fucked, oh no: ' + err.message)
		})
	} else {
		await msg.addReaction('❌')
		Memer.reply('I only have one airhorn, dude. Please wait until the current sound is done or the ear-rape ghost will visit you in your sleep!', msg)
	}
}