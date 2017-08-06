const file = Math.floor(Math.random() * 2 + 1)

exports.run = async function (Memer, msg) {
	if (!Memer.client.getChannel(msg.member.voiceState.channelID).permissionsOf(Memer.client.user.id).has('voiceConnect') ||
		!Memer.client.getChannel(msg.member.voiceState.channelID).permissionsOf(Memer.client.user.id).has('voiceSpeak')) {
		return msg.channel.createMessage(`${msg.author.mention} Well shit, there was a permission error! Make sure I have \`add reactions\`, \`connect\`, and \`speak\` so I can do this shit!`)
	}
	if (!msg.member.voiceState.channelID) {
		await msg.addReaction('❌')
		msg.channel.createMessage(`${msg.author.mention}, join a voice channel fam`)
	} else {
		if (!Memer.client.voiceConnections.get(msg.channel.guild.id)) {
			msg.react('👍')
			const conn = await Memer.client.joinVoiceChannel(msg.member.voiceState.channelID)
			conn.play(`./assets/horns/${file}.opus`)
			conn.player.dispatcher.once('end', () => {
				conn.channel.leave()
			})
		} else {
			await msg.react('❌')
			msg.reply('I only have one airhorn, dude. Please wait until the current sound is done or the ear-rape ghost will visit you in your sleep!')
		}
	}
}