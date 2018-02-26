const { GenericCommand } = require('../models/')

module.exports = new GenericCommand(
  async ({ Memer: { bot }, msg }) => {
    if (!bot.voiceConnections.get(msg.channel.guild.id)) {
      return 'I\'m not even playing anything in this server'
    }
    if (!msg.member.voiceState.channelID) {
      return 'You\'re not even in a voice channel'
    }
    if (msg.member.voiceState.channelID !== bot.voiceConnections.get(msg.channel.guild.id).channelID) {
      return 'You\'re not even in my voice channel'
    }

    await bot.leaveVoiceChannel(bot.voiceConnections.get(msg.channel.guild.id).channelID)
    msg.addReaction('❌').catch(() => {}) // Usually if the user deletes the message before the bot can react
  }, {
    triggers: ['stop'],
    description: 'STOP FARTING'
  }
)
