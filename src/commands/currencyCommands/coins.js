const { GenericCommand } = require('../../models/')

module.exports = new GenericCommand(
  async ({ Memer, msg }) => {
    let coins = await Memer.db.getCoins(msg.author.id)
    return {
      title: 'how many coins you got fam?',
      description: `oh okay u got this many: ${coins.coin}`,
      thumbnail: {url: 'https://dankmemer.lol/coin.png'},
      footer: {text: 'dont spend it all in one place ok'}
    }
  },
  {
    triggers: ['coins'],
    description: 'u got dis many coins ok'
  }
)
