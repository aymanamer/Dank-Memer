const { GenericCommand } = require('../models/')

module.exports = new GenericCommand(
  async ({ Memer, msg }) => {
    let coins = await Memer.db.getCoins(msg.author.id)
    return {
      description: `u got dis many coins ok: ${coins.coin}`
    }
  },
  {
    triggers: ['coins'],
    description: 'u got dis many coins ok'
  }
)
