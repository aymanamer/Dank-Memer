const { GenericCommand } = require('../../models/')
const specialCodes = {
  '0': ':zero:',
  '1': ':one:',
  '2': ':two:',
  '3': ':three:',
  '4': ':four:',
  '5': ':five:',
  '6': ':six:',
  '7': ':seven:',
  '8': ':eight:',
  '9': ':nine:',
  '#': ':hash:',
  '*': ':asterisk:',
  '?': ':grey_question:',
  '!': ':grey_exclamation:',
  ' ': '   '
}

module.exports = new GenericCommand(
  async ({ args }) => {
    return args
      .join(' ')
      .toLowerCase()
      .split('')
      .map(letter => {
        if (/[a-z]/g.test(letter)) {
          return `:regional_indicator_${letter}: `
        } else if (specialCodes[letter]) {
          return `${specialCodes[letter]} `
        }
        return letter
      }).join('')
  }, {
    triggers: ['emojify'],
    description: 'Make the bot say whatever you want with emojis!',
    usage: '{command} <what you want the bot to say>',

    missingArgs: 'What do you want me to put into emojis?'
  }
)
