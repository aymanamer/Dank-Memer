const { GenericCommand } = require('../models')

module.exports = new GenericCommand(
  async ({ Memer, msg, args, addCD }) => {
    if (!msg.member.permission.has('manageGuild') && !Memer.config.devs.includes(msg.author.id)) {
      return 'You are not authorized to use this command. You must have `Manage Server` to disable commands.'
    }

    const gConfig = await Memer.db.getGuild(msg.channel.guild.id) || await Memer.db.createGuild(msg.channel.guild.id)

    args = Memer.removeDuplicates(args
      .map(cmd => {
        return (Memer.cmds.find(c => c.props.triggers.includes(cmd)) || { props: { triggers: [cmd] } }).props.triggers[0]
      }))

    const alreadyDisabled = args.filter(cmd => gConfig.disabledCommands.includes(cmd))
    if (alreadyDisabled[0]) {
      return `These commands are already disabled:\n\n${alreadyDisabled.map(c => `\`${c}\``).join(', ')}\n\nHow tf do you plan to disable already disabled commands??`
    }

    if (!args[0]) {
      return { content: `Specify a command to disable, or multiple.\n\nExample: \`${gConfig.prefix} disable meme trigger shitsound\` or \`${gConfig.prefix} disable meme\``, reply: true }
    }
    if (args.some(cmd => !Memer.cmds.find(c => c.props.triggers.includes(cmd)) && cmd !== 'nsfw')) {
      return { content: `The following commands are invalid: \n\n${args.filter(cmd => !Memer.cmds.find(c => c.props.triggers.includes(cmd))).map(cmd => `\`${cmd.props.triggers[0]}\``).join(', ')}\n\nPlease make sure all of your commands are valid and try again.`, reply: true }
    }

    gConfig.disabledCommands = gConfig.disabledCommands.concat(args)
    await Memer.db.updateGuild(gConfig)

    return `The following commands have been disabled successfully:\n\n${args.map(cmd => `\`${cmd}\``).join(', ')}`
  }, {
    triggers: ['disable'],
    description: 'Use this command to disable commands you do not wish for your server to use'
  }
)
