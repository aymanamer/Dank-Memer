const { GenericCommand } = require('../models/')

module.exports = new GenericCommand(
  () => `I rate you a ${Math.floor(Math.random() * 100 + 1)}/100 on the dank scale.`,
  {
    triggers: ['dankrate', 'rate'],
    description: 'How dank are you?'
  }
)
