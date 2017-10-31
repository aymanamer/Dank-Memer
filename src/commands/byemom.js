const GenericImageCommand = require('../models/GenericImageCommand.js')

const command = new GenericImageCommand('byemom', (msg, args) => {
  let avatarurl = msg.mentions.length > 0 ? msg.mentions[0].staticAvatarURL : msg.author.staticAvatarURL
  if (['jpg', 'jpeg', 'gif', 'png', 'webp'].some(x => args.join(' ').includes(x))) {
    avatarurl = args.join(' ').replace(/gif|webp/g, 'png')
  }

  if (!args[0]) {
    msg.channel.createMessage('You need to add something to search on google, try again.')
    return false
  }

  if (args.join(' ').length > 140) {
    msg.channel.createMessage(`Google Search too long. You're ${args.join(' ').length - 140} characters over the limit!`)
    return false
  }

  if (!/^[\x00-\x7F]*$/.test(args.join(' '))) {
    msg.channel.createMessage('Your argument contains invalid characters. Please try again.')
    return false
  }

  return JSON.stringify([`${avatarurl}`, `${args.join(' ')}`])
}, {
  usage: '{command} <something to google search>',
  aliases: ['bye', 'google'],
  description: 'Quick, mom is gone, what are you gonna search on google?'
})

module.exports = command
