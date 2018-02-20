const GenericImageCommand = require('../models/GenericImageCommand.js')

const command = new GenericImageCommand('tweet', (msg, args) => {
  let avatarurl = msg.mentions.length > 0 ? msg.mentions[0].staticAvatarURL : msg.author.staticAvatarURL
  if (['jpg', 'jpeg', 'gif', 'png', 'webp'].some(x => args.join(' ').includes(x))) {
    avatarurl = args.join(' ').replace(/gif|webp/g, 'png')
  }

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

  return JSON.stringify([`${avatarurl}`, `${args.join(' ')}`])
}, {
  usage: '{command} <something to make trump say>',
  aliases: ['trump'],
  description: 'dear lord, what is trump saying now...'
})

module.exports = command