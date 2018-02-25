exports.run = async function (Memer, msg) {
  const file = Math.floor(Math.random() * 76 + 1)
  if (!msg.member.voiceState.channelID) {
    return msg.reply('join a voice channel fam', msg)
  }

  if (!Memer.bot.getChannel(msg.member.voiceState.channelID).permissionsOf(Memer.bot.user.id).has('voiceConnect') ||
      !Memer.bot.getChannel(msg.member.voiceState.channelID).permissionsOf(Memer.bot.user.id).has('voiceSpeak')) {
    return msg.reply('Well shit, there was a permission error! Make sure I have `connect` and `speak` so I can do this shit!', msg)
  }

  if (!Memer.bot.voiceConnections.get(msg.channel.guild.id)) {
    msg.addReaction('😃')
    const conn = await Memer.bot.joinVoiceChannel(msg.member.voiceState.channelID)
    conn.play(`./assets/shitsound/${file}.opus`)
    conn.once('end', async () => {
      await Memer.bot.leaveVoiceChannel(msg.channel.guild.members.get(Memer.bot.user.id).voiceState.channelID)
      if (Memer.bot.voiceConnections.get(msg.channel.guild.id)) {
        await Memer.bot.voiceConnections.get(msg.channel.guild.id).disconnect()
        await Memer.bot.voiceConnections.get(msg.channel.guild.id)._destroy()
        await Memer.bot.voiceConnections.remove(Memer.bot.voiceConnections.get(msg.guild.id))
      }
    })
  } else {
    msg.channel.createMessage('I only have one meme machine, dude. Please wait until the current sound is done, you assbutt')
  }
}

exports.props = {
  name: 'mememusic',
  usage: '{command}',
  aliases: ['shitsound'],
  cooldown: 1000,
  description: 'Meme music? More like bad music',
  perms: ['addReactions']
}
