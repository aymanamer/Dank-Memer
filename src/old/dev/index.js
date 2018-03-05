const { GenericCommand } = require('../../../models/')
const commands = require('./commands')

//   { name: 'eval', value: 'eval <args>' },
//   { name: 'bash', value: 'bash <args>' },
// ]

module.exports = new GenericCommand(
  async ({ Memer, msg, args }) => {
    if (!Memer.config.devs.includes(msg.author.id)) {
      return
    }

    if (args[0] === 'help' || !args[0] || !commands[args[0]]) {
      return {
        fields: Object.keys(commands).map(c => ({ name: c, value: commands[c].help })),
        footer: { text: 'Now go fuck people up with these OP commands!' }
      }
    }

    return commands[args.shift()].fn({ Memer, msg, args })
  }, {
    triggers: ['dev', 'stupid-bot'],
    usage: '{command} you really don\'t need docs for this',
    description: 'henlo, u stinky birb',

    ownerOnly: true
  }
)
