const { GenericImageCommand } = require('../../models/')

module.exports = new GenericImageCommand({
  triggers: ['tweet', 'trump'],
  description: 'dear lord, what is trump saying now...',
  usage: '{command} <something to make trump say>'
}, (msg, args) => {
  if (!args[0]) {
    msg.channel.createMessage('You need to add something to make trump tweet, try again.')
    return false
  }

  if (args.join(' ').length > 140) {
    msg.channel.createMessage(`Too long. You're ${args.join(' ').length - 140} characters over the limit!`)
    return false
  }

  if (!/^[\x00-\x7F]*$/.test(args.join(' '))) { // eslint-disable-line
    msg.channel.createMessage('Your argument contains invalid characters. Please try again.')
    return false
  }

  return JSON.stringify([null, args.join(' ')]) // melmsie needs to fix this after fixing https://github.com/Dank-Memer/meme-server/blob/master/assets/tweet.js
})
