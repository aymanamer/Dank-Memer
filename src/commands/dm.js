const { GenericCommand } = require('../models/')

module.exports = new GenericCommand(
  async ({ Memer, msg, args }) => {
    try {
      const channel = await Memer.bot.getDMChannel(args[0])
      await channel.createMessage({ embed: {
        color: Memer.randomColor(),
        title: '📫 You have received a message from the developers!',
        description: args.slice(1).join(' '),
        footer: { text: 'To reply, please use pls vent.' }
      }})
      msg.addReaction('📧')
    } catch (e) {
      msg.addReaction('❌')
      return `**Fuck!** *${e.message}*`
    }
  }, {
    triggers: ['dm', 'slideintothedms'],
    usage: '{command} <id> <shit>',
    description: 'melmsie stinks',

    ownerOnly: true
  }
)
