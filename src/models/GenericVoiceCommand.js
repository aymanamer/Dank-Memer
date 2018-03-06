const { GenericCommand } = require('.')

module.exports = class GenericVoiceCommand {
  constructor (cmdProps) {
    this.cmdProps = cmdProps
  }

  async run ({ Memer, msg, addCD }) {
    const file = typeof this.cmdProps.files === 'string'
      ? this.cmdProps.files
      : Math.floor(Math.random() * this.cmdProps.files + 1)

    if (!msg.member.voiceState.channelID) {
      return msg.reply('join a voice channel fam')
    }

    const perms = Memer.bot.getChannel(msg.member.voiceState.channelID).permissionsOf(Memer.bot.user.id)

    if (!perms.has('voiceConnect') || !perms.has('voiceSpeak')) {
      return msg.reply('Well shit, there was a permission error! Make sure I have `connect` and `speak` so I can do this shit!')
    }

    Memer.bot.leaveVoiceChannel(msg.channel.guild.id)

    if (Memer.bot.voiceConnections.get(msg.channel.guild.id)) {
      return this.cmdProps.existingConn
    }

    msg.addReaction(this.cmdProps.reaction)
    const conn = await Memer.bot.joinVoiceChannel(msg.member.voiceState.channelID)

    await addCD()

    conn.play(`./assets/audio/${this.cmdProps.dir}/${file}.${this.cmdProps.ext || 'opus'}`)
    conn.once('end', async () => {
      await Memer.bot.leaveVoiceChannel(msg.channel.guild.members.get(Memer.bot.user.id).voiceState.channelID)
      if (Memer.bot.voiceConnections.get(msg.channel.guild.id)) {
        await Memer.bot.voiceConnections.get(msg.channel.guild.id).disconnect()
        await Memer.bot.voiceConnections.get(msg.channel.guild.id)._destroy()
        await Memer.bot.voiceConnections.remove(Memer.bot.voiceConnections.get(msg.guild.id))
      }
    })
  }

  get props () {
    return new GenericCommand(
      null,
      Object.assign({
        cooldown: 10000,
        perms: ['addReactions']
      }, this.cmdProps)
    ).props
  }
}
