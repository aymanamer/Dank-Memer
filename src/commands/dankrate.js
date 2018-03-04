const { GenericCommand } = require('../models/')
const reaction = [
  '<:feelsYUCKman:419485966340849684>',
  '<:feelsautisticman:397488382500143104>',
  '<:reee:397488383963955211>',
  '<:feelsbadman:397488381648699403>',
  '<a:MonkaShake:415269882792378390>',
  '<:feelscringeman:397488381011165194>',
  '<:feelsdabman:397489529319194653>',
  '<:feelsLMAOman:419494568103378944>',
  '<:feelsgreatman:397488378548977671>',
  '<a:pepeclap:404925858940452864>'
]

module.exports = new GenericCommand(
  async ({ msg, args }) => {
    let target = !args[0] || args[0].toLowerCase() === 'me'
      ? 'You are'
      : (
        msg.mentions[0]
          ? `${msg.mentions[0].nick || msg.mentions[0].username} is`
          : `${args.join(' ')} is`
      )
    const rating = Math.floor(Math.random() * 100) + 1
    return {
      title: 'dank r8 machine',
      description: `${target} ${rating}% dank ${reaction[Number((rating / 10).toFixed()) - 1]}`
    }
  },
  {
    triggers: ['dankrate', 'rate'],
    description: 'See how dank you are'
  }
)
