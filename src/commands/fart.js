const file = Math.floor(Math.random() * 5 + 1)

exports.run = async function (Memer, msg) {
	if (!msg.member.voiceState.channelID) {
		await msg.addReaction('❌')
		return msg.reply('join a voice channel fam', msg)
	}

	if (!Memer.bot.getChannel(msg.member.voiceState.channelID).permissionsOf(Memer.bot.user.id).has('voiceConnect') ||
		!Memer.bot.getChannel(msg.member.voiceState.channelID).permissionsOf(Memer.bot.user.id).has('voiceSpeak')) {
		return msg.reply('Well shit, there was a permission error! Make sure I have `connect` and `speak` so I can do this shit!', msg)
	}

	if (!Memer.bot.voiceConnections.get(msg.channel.guild.id)) {
		msg.addReaction('👍')
		const conn = await Memer.bot.joinVoiceChannel(msg.member.voiceState.channelID)
		conn.play(`./assets/farts/${file}.mp3`)
		conn.once('end', async () => {
			await Memer.bot.leaveVoiceChannel(msg.channel.guild.members.get(Memer.bot.user.id).voiceState.channelID)
			if (Memer.bot.voiceConnections.get(msg.channel.guild.id)) {
				await Memer.bot.voiceConnections.get(msg.channel.guild.id).disconnect()
				await Memer.bot.voiceConnections.get(msg.channel.guild.id)._destroy()
				await Memer.bot.voiceConnections.remove(Memer.bot.voiceConnections.get(msg.guild.id))
			}
		})
	} else {
		await msg.addReaction('❌')
		msg.reply('I only have one butthole, dude. Please wait until the current sound is done or the ear-rape ghost will visit you in your sleep!', msg)
	}
}

exports.props = {
	name: 'fart',
	usage: '{command}',
	aliases: ['toot'],
	cooldown: 1000,
	description: 'ew!.'
}
