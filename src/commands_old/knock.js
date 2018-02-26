exports.run = async function (Memer, msg) {
  if (!msg.member.voiceState.channelID) {
    return msg.reply('join a voice channel fam', msg)
  }

  if (!Memer.bot.getChannel(msg.member.voiceState.channelID).permissionsOf(Memer.bot.user.id).has('voiceConnect') ||
    !Memer.bot.getChannel(msg.member.voiceState.channelID).permissionsOf(Memer.bot.user.id).has('voiceSpeak')) {
    return msg.reply('Well shit, there was a permission error! Make sure I have `connect` and `speak` so I can do this shit!', msg)
  }

  if (!Memer.bot.voiceConnections.get(msg.channel.guild.id)) {
    msg.addReaction('👍')
    const conn = await Memer.bot.joinVoiceChannel(msg.member.voiceState.channelID)
    conn.play(`./assets/knock/knock.mp3`)
    conn.once('end', async () => {
      await Memer.bot.leaveVoiceChannel(msg.channel.guild.members.get(Memer.bot.user.id).voiceState.channelID)
      if (Memer.bot.voiceConnections.get(msg.channel.guild.id)) {
        await Memer.bot.voiceConnections.get(msg.channel.guild.id).disconnect()
        await Memer.bot.voiceConnections.get(msg.channel.guild.id)._destroy()
        await Memer.bot.voiceConnections.remove(Memer.bot.voiceConnections.get(msg.guild.id))
      }
    })
  } else {
    msg.channel.createMessage('I can only knock so much my dude, wait until I\'m done with whatever sound is playing before trying')
  }
}

exports.props = {
  name: 'knock',
  usage: '{command}',
  aliases: [],
  cooldown: 1000,
  description: 'Troll your friends with the classic twitch knock prank!',
  perms: ['addReactions']
}
