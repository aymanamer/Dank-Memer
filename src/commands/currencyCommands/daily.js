const { GenericCommand } = require('../../models/')

module.exports = new GenericCommand(
  async ({ Memer, msg, args, addCD }) => {
    await Memer.db.addCoins(msg.author.id, 100)
    let coins = await Memer.db.getCoins(msg.author.id)
    await addCD()
    return {
      title: 'here are ur daily coins ok',
      description: `u got 100, now u have ${coins.coin}`,
      thumbnail: {url: 'https://dankmemer.lol/coin.png'},
      footer: {text: 'spend it all in one place ok'}
    }
  },
  {
    triggers: ['daily'],
    cooldown: 86400000,
    cooldownMessage: 'I\'m not made of money dude, wait {cooldown}',
    description: 'u got dis many coins ok'
  }
)
