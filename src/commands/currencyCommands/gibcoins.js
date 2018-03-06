const { GenericCommand } = require('../../models/')

module.exports = new GenericCommand(
  async ({ Memer, msg, args, addCD }) => {
    const chances = Math.floor(Math.random() * 8) + 1

    let coins = await Memer.db.getCoins(msg.author.id)
    await addCD()
    await Memer.db.addCoins(msg.author.id, chances)
    return {description: `u won ${chances} coins, now u got ${coins.coin + chances}`}
  },
  {
    triggers: ['gibcoins'],
    cooldown: 60000,
    description: 'u got dis many coins ok'
  }
)
