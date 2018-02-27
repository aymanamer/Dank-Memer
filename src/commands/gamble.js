const { GenericCommand } = require('../models/')

module.exports = new GenericCommand(
  async ({ Memer, msg, args, addCD }) => {
    const bet = Number(args[0])
    if (!bet) {
      return { description: 'you have to bet actual coins, dont try to break me' }
    }
    if (bet < 1) {
      return { description: 'u can\'t bet less than 1 coins you dumb' }
    }

    let coins = await Memer.db.getCoins(msg.author.id)
    if (bet > coins.coin) {
      return { description: `u only have ${coins.coin} coins, dont bluff me` }
    }

    await addCD()

    if (Math.random() >= 0.6) {
      const multiplier = (Math.random() * 0.9) + 1

      const winnings = Math.round(bet * multiplier)
      if (winnings === bet) {
        return 'broke even'
      }

      await Memer.db.addCoins(msg.author.id, winnings)
      return { description: `u won ${winnings} coins, now u got ${coins.coin + parseInt(winnings)}` }
    } else {
      await Memer.db.removeCoins(msg.author.id, bet)
      return { description: `haha u suck. u lost ${bet} coins. now u got ${(coins.coin - bet) < 0 ? 0 : coins.coin - bet}` }
    }
  },
  {
    triggers: ['gamble'],
    cooldown: 5000,
    description: 'u got dis many coins ok',
    missingArgs: 'You gotta gamble some of ur coins bro, `pls gamble 15` for example, dummy'
  }
)
