const { GenericCommand } = require('../../models/')

module.exports = new GenericCommand(
  async () => ({
    title: 'Donate to Dank Memer on Patreon!',
    description: 'Help Melmsie keep the bot alive by donating to help pay server costs!',
    url: 'https://www.patreon.com/dankmemerbot',
    footer: { text: 'pls donut for my bot, im running low on money' }
  }), {
    triggers: ['patreon', 'donate', 'gibmonies', 'pay', 'donut', 'plsdonut'],
    description: 'See how you can donate to the bot and gain access to donor features!',
    perms: ['embedLinks']
  }
)
