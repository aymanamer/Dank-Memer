const { GenericCommand } = require('../../models/')

module.exports = new GenericCommand(
  async ({ Memer, msg, args }) => {
    if (!args[0]) {
      return 'you need to choose which tag, use `pls tag list` to see this server\'s tags'
    }
    let tags = await Memer.db.getAllTags(msg.channel.guild.id)
    let bags = tags.filter(oof => oof.name === args.toString())
    console.log(bags)
    return bags[0].text
  }, {
    triggers: ['tag'],
    usage: '{command} <id> <shit>',
    description: 'melmsie stinks'
  }
)
