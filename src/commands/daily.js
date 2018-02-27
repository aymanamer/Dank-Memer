const { GenericCommand } = require('../models/')

module.exports = new GenericCommand(
  async ({ Memer, msg, args, addCD }) => {
    await Memer.db.addCoins(msg.author.id, 100)
    let coins = await Memer.db.getCoins(msg.author.id)
    await addCD()
    return {
      description: `here are ur daily coins ok, you haz this many now: ${coins.coin}`
    }
  },
  {
    triggers: ['daily'],
    cooldown: 86400000,
    description: 'u got dis many coins ok'
  }
)
