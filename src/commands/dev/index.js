const { GenericCommand } = require('../../models/')
const commands = require('./commands')

// [
//   { name: 'reboot', value: 'reboot [shard, all]' },
//   { name: 'eval', value: 'eval <args>' },
//   { name: 'bash', value: 'bash <args>' },
//   { name: 'git', value: 'git pull' },
//   { name: 'donor', value: '[add, remove] [1, 5, 10] <id or @tag>' },
//   { name: 'blacklist', value: '[add, remove] [guild, user, channel] <id or @tag>' }
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
    triggers: ['dev'],
    description: 'boop',

    ownerOnly: true
  }
)
