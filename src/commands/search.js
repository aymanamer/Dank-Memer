const { GenericImageCommand } = require('../models/')

module.exports = new GenericImageCommand({
  triggers: ['search'],
  description: 'The Search'
}, (msg, args) => {
  args = args.join(' ')
  if (!args) {
    msg.channel.createMessage('You need to add some text, try again.')
    return false
  }
  if (args.length > 70) {
    msg.channel.createMessage(`Text too long. You're ${args.length - 70} characters over the limit!`)
    return false
  }

  if (msg.mentions[0]) {
    args = args
      .replace(msg.mentions[0].nick, '')
      .replace(msg.mentions[0].username, '')
  }

  return args
})
