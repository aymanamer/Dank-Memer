const GenericImageCommand = require('../models/GenericImageCommand.js')

const command = new GenericImageCommand('search', (msg, args) => {
  if (args.length < 1) {
    msg.channel.createMessage('You need to add some text, try again.')
    return false
  }
  if (args.join(' ').length > 70) {
    msg.channel.createMessage(`Text too long. You're ${args.join(' ').length - 70} characters over the limit!`)
    return false
  }

  if (msg.mentions.length > 0) {
    args = args.join(' ').substr(21)
  } else {
    args = args.join(' ')
  }

  return args
}, {
  description: 'The Search'
})

module.exports = command
