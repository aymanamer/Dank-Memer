const { GenericCommand } = require('../../models/')

module.exports = new GenericCommand(
  async () => ({
    fields: [
      { name: 'Add Dank Memer', value: '\n[Here](https://goo.gl/BPWvB9)', inline: true },
      { name: 'Join a Dank Server', value: '\n[Here](https://discord.gg/ebUqc7F)', inline: true }
    ]
  }), {
    triggers: ['invite', 'support', 'server'],
    description: 'Get an invite for the bot or to the support server.',
    perms: ['embedLinks']
  }
)
