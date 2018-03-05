const { GenericCommand } = require('../models')

module.exports = new GenericCommand(
  async ({ Memer, msg, args, addCD }) => {
    if (!msg.member.permission.has('manageGuild') && !Memer.config.devs.includes(msg.author.id)) {
      return 'You are not authorized to use this command. You must have `Manage Server` to change the prefix.'
    }

    const gConfig = await Memer.db.getGuild(msg.channel.guild.id) || await Memer.db.createGuild(msg.channel.guild.id)

    if (!args[0]) {
      return `What do you want your new prefix to be?\n\nExample: \`${gConfig.prefix} prefix pepe\`` // please think of a better example..
    }
    if (args.join(' ').length > 32) {
      return `Your prefix can't be over 10 characters long. You're ${args.join(' ').length - 32} characters over the limit.`
    }
    if (gConfig.prefix === args.join(' ').toLowerCase()) {
      return `\`${gConfig.prefix}\` is already your current prefix.`
    }

    gConfig.prefix = args.join(' ').toLowerCase()
    await Memer.db.updateGuild(gConfig)
    await addCD()

    return {
      description: `Prefix successfully changed to \`${gConfig.prefix}\`.`
    }
  }, {
    triggers: ['prefix'],
    usage: '{command} <prefix of your choice>',
    description: 'Change Dank Memer\'s prefix!',
    perms: ['embedLinks'],
    cooldown: 5000
  }
)
