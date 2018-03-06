const { GenericCommand } = require('../../models')

module.exports = new GenericCommand(
  async ({ Memer, msg, args, addCD }) => {
    if (!msg.member.permission.has('manageGuild') && !Memer.config.devs.includes(msg.author.id)) {
      return 'You are not authorized to use this command. You must have `Manage Server` to enable commands.'
    }

    const gConfig = await Memer.db.getGuild(msg.channel.guild.id) || await Memer.db.createGuild(msg.channel.guild.id)

    args = Memer.removeDuplicates(args
      .map(cmd => {
        return (Memer.cmds.find(c => c.props.triggers.includes(cmd)) || { props: { triggers: [cmd] } }).props.triggers[0]
      }))

    const arentDisabled = args.filter(cmd => !gConfig.disabledCommands.includes(cmd))
    if (arentDisabled[0]) {
      return `These commands aren't disabled:\n\n${arentDisabled.map(c => `\`${c}\``).join(', ')}\n\nHow tf do you plan to enable already enabled commands??`
    }

    if (!args[0]) {
      return `Specify a command to enable, or multiple.\n\nExample: \`${gConfig.prefix} enable meme trigger shitsound\` or \`${gConfig.prefix} enable meme\``
    }
    if (args.some(cmd => !Memer.cmds.find(c => c.props.triggers.includes(cmd)) && cmd !== 'nsfw')) {
      return `The following commands are invalid: \n\n${args.filter(cmd => !Memer.cmds.find(c => c.props.triggers.includes(cmd))).map(cmd => `\`${cmd.props.triggers[0]}\``).join(', ')}\n\nPlease make sure all of your commands are valid and try again.`
    }

    args.map(cmd => {
      gConfig.disabledCommands.splice(gConfig.disabledCommands.indexOf(cmd), 1)
    })

    await Memer.db.updateGuild(gConfig)

    return `The following commands have been enabled successfully:\n\n${args.map(cmd => `\`${cmd}\``).join(', ')}`
  }, {
    triggers: ['enable'],
    description: 'Use this command to enable disabled commands.'
  }
)
