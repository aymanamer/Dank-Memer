exports.run = async function (Memer, msg) {
	if (!Memer.client.getChannel(msg.member.voiceState.channelID).permissionsOf(Memer.client.user.id).has('voiceConnect') ||
		!Memer.client.getChannel(msg.member.voiceState.channelID).permissionsOf(Memer.client.user.id).has('voiceSpeak')) {
		return Memer.reply('Well shit, there was a permission error! Make sure I have `connect` and `speak` so I can do this shit!', msg)
	}
	if (!msg.member.voiceState.channelID) {
		await msg.addReaction('❌')
		msg.channel.createMessage(`${msg.author.mention}, join a voice channel fam`)
	} else {
		if (!Memer.client.voiceConnections.get(msg.channel.guild.id)) {
			msg.addReaction('👍')
			const conn = await Memer.client.joinVoiceChannel(msg.member.voiceState.channelID)
			conn.play('./assets/knock.opus')
			conn.once('end', () => {
				Memer.client.leaveVoiceChannel(msg.channel.guild.id)
			})
		} else {
			await msg.addReaction('❌')
			Memer.reply('Another sound is already playing, douche', msg)
		}
	}
}