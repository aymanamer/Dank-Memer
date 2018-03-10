const { GenericImageCommand } = require('../../models/')

module.exports = new GenericImageCommand({
  triggers: ['shit', 'shitty'],
  description: 'The shit on my shoe!'
}, (msg, args) => {
  args = args.join(' ')
  if (msg.mentions[0]) {
    args = msg.mentions[0].username
  } else {
    if (!args[0]) {
      args = msg.author.username
    } else if (args.length > 35) {
      msg.channel.createMessage(`This shit was too large. You're ${args.length - 35} characters over the limit!`)
      return false
    }
  }

  if (!/^[\x00-\x7F]*$/.test(args)) { // eslint-disable-line
    msg.channel.createMessage('Your argument contains invalid characters. Please try again.')
    return false
  }

  return args
})
