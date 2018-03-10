const { GenericCommand } = require('../../models/')

module.exports = new GenericCommand(
  async ({ Memer, msg, args }) => {
    let tags = await Memer.db.getAllTags(msg.channel.guild.id)
    let bags = tags.map(oof => `${oof.name}`)
    console.log(bags)
    return `Here are all your tags: ${bags.join(', ')}`
  }, {
    triggers: ['list'],
    usage: '{command} <id> <shit>',
    description: 'melmsie stinks',

    ownerOnly: true
  }
)
