const { GenericCommand } = require('../models/')
const reaction = [
  '🤢',
  '😰',
  '😵',
  '😥',
  '😕',
  '😗',
  '😏',
  '😌',
  '☺',
  '💁'
]

module.exports = new GenericCommand(
  async ({ msg, args }) => {
    let target = !args[0] || args[0].toLowerCase() === 'me'
      ? 'You are'
      : (
        msg.mentions[0]
          ? `${msg.mentions[0].nick || msg.mentions[0].username} is a`
          : `${args.join(' ')} is a`
      )
    const rating = Math.floor(Math.random() * 100) + 1
    return {
      title: 'waifu r8 machine',
      description: `${target} ${rating}/100 waifu ${reaction[Number((rating / 10).toFixed()) - 1]}`
    }
  },
  {
    triggers: ['waifu'],
    description: 'See how good of a waifu you are'
  }
)
