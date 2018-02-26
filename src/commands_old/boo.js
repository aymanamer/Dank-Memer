exports.run = async function (Memer, msg) {
  const file = Math.floor(Math.random() * 5 + 1)
  if (!msg.member.voiceState.channelID) {
    return msg.reply('join a voice channel fam', msg)
  }

  if (!Memer.bot.getChannel(msg.member.voiceState.channelID).permissionsOf(Memer.bot.user.id).has('voiceConnect') ||
    !Memer.bot.getChannel(msg.member.voiceState.channelID).permissionsOf(Memer.bot.user.id).has('voiceSpeak')) {
    return msg.reply('Well shit, there was a permission error! Make sure I have `connect` and `speak` so I can do this shit!', msg)
  }

  if (!Memer.bot.voiceConnections.get(msg.channel.guild.id)) {
    msg.addReaction('👻')
    const conn = await Memer.bot.joinVoiceChannel(msg.member.voiceState.channelID)
    conn.play(`./assets/scares/${file}.opus`)
    conn.once('end', async () => {
      await Memer.bot.leaveVoiceChannel(msg.channel.guild.members.get(Memer.bot.user.id).voiceState.channelID)
      if (Memer.bot.voiceConnections.get(msg.channel.guild.id)) {
        await Memer.bot.voiceConnections.get(msg.channel.guild.id).disconnect()
        await Memer.bot.voiceConnections.get(msg.channel.guild.id)._destroy()
        await Memer.bot.voiceConnections.remove(Memer.bot.voiceConnections.get(msg.guild.id))
      }
    })
  } else {
    msg.channel.createMessage('I only have one pet ghost, dude. Please wait until the current sound is done, you assbutt')
  }
}

exports.props = {
  name: 'boo',
  usage: '{command}',
  aliases: ['scare', 'jumpscare'],
  cooldown: 1,
  description: 'AHHHHH SCARY',
  perms: ['addReactions']
}
