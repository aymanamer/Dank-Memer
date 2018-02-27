const { GenericCommand } = require('../models/')

module.exports = new GenericCommand(
  async ({ Memer, msg, args, addCD }) => {
    const chances = Math.floor(Math.random() * 10) + 1
    const numOne = Math.floor(Math.random() * 1) + 1
    const numTwo = Math.floor(Math.random() * 5) * 0.1
    const punishment = (Math.floor(Math.random() * 8) + 1.8) * 0.1
    const bet = parseInt(args[0])
    let coins = await Memer.db.getCoins(msg.author.id)
    if (isNaN(bet)) {
      return {description: `you have to bet actual coins, dont try to break me`}
    }
    if (bet > coins.coin) {
      return {description: `u only have ${coins.coin} coins, dont bluff me`}
    }
    if (bet < 0) {
      return {description: `u can't bet 0 coins you dumb`}
    }
    await addCD()
    if (chances > 6) {
      const winnings = Math.round(bet * (numOne + numTwo))
      await Memer.db.addCoins(msg.author.id, winnings)
      return {description: `u won ${winnings} coins, now u got ${coins.coin + parseInt(winnings)}`}
    } else {
      const losings = bet * punishment
      const lost = Math.round(losings)
      if (coins.coin - lost <= 0) {
        await Memer.db.removeCoins(msg.author.id, 0)
      }
      await Memer.db.removeCoins(msg.author.id, lost)
      return {description: `haha u suck. u lost ${lost} coins. now u got ${coins.coin - lost}`}
    }
  },
  {
    triggers: ['gamble'],
    cooldown: 5000,
    description: 'u got dis many coins ok',
    missingArgs: 'You gotta gamble some of ur coins bro, `pls gamble 15` for example, dummy'
  }
)
