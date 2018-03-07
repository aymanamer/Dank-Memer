const { GenericCommand } = require('../../models/')

module.exports = new GenericCommand(
  async ({ Memer, msg, args, addCD }) => {
    if (!msg.mentions[0]) {
      return {description: 'who r u giving coins to, dumb'}
    }
    if (!args[1]) {
      return {description: 'so are you just like, sharing air?'}
    }
    let given = Number(args[0]) || Number(args[1])
    if (!given) {
      return 'you have to to actually share a number, dummy. Not ur dumb feelings'
    }
    let giverCoins = await Memer.db.getCoins(msg.author.id)
    let takerCoins = await Memer.db.getCoins(msg.mentions[0].id)
    if (given > giverCoins.coin) {
      return {description: `u only have ${giverCoins.coin} coins, u can't share that many`}
    }
    if (given < 0) {
      return {description: 'u can\'t share 0 coins you dumb'}
    }

    await addCD()
    await Memer.db.addCoins(msg.mentions[0].id, given)
    await Memer.db.removeCoins(msg.author.id, given)
    return {description: `u gave ${msg.mentions[0].username} ${given} coins, now u got ${giverCoins.coin - given} and they got ${takerCoins.coin + given}`}
  },
  {
    triggers: ['share'],
    cooldown: 5000,
    description: 'u got dis many coins ok',
    missingArgs: 'u need to choose who to share with and how many coins dummy'
  }
)
