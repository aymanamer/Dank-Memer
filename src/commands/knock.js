exports.run = async function (Memer, msg) {
    if (!msg.member.voiceState.channelID) {
      await msg.addReaction('❌')
      return msg.reply('join a voice channel fam', msg)
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
      await msg.addReaction('❌')
      msg.channel.createMessage('I only have one pet ghost, dude. Please wait until the current sound is done or the ear-rape ghost will visit you in your sleep!')
    }
  }
  
  exports.props = {
    name: 'knock',
    usage: '{command}',
    aliases: [],
    cooldown: 1000,
    description: 'Troll your friends!',
    perms: ['voiceConnect', 'voiceSpeak', 'addReactions']
  }
  