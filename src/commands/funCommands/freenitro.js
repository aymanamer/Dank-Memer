const { GenericCommand } = require('../../models/')

module.exports = new GenericCommand(
  () => {
    return {
      description: `I gotchu fam, have some [free discord nitro](https://goo.gl/CWqeBF)`,
      footer: {text: 'you\'re welcome'}
    }
  },
  {
    triggers: ['freenitro', 'rickroll'],
    description: 'owo whats this'
  }
)
