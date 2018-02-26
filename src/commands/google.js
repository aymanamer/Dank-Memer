const { GenericCommand } = require('../models/')

module.exports = new GenericCommand(
  ({ args }) => `http://lmgtfy.com/?q=${args.join('+')}`,
  {
    missingArgs: 'Hey, what do you want me to google?',

    triggers: ['google', 'lmgtfy'],
    usage: '{command} search terms',
    description: 'Sick of someone asking dumb questions? LMGTFY it for them!'
  }
)
