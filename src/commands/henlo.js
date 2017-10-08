const { henlo } = require('../assets/arrays.json')
exports.run = async function (Memer, msg, args) {
  let mention
  let text
  if (!args[0]) {
    mention = msg.author.username
    text = Memer.randomInArray(henlo)
  } else if (msg.mentions.length > 0) {
    mention = msg.mentions[0].username
    text = args.join(' ').replace(`@${msg.mentions[0].username}`, '').length > 0 ? args.join(' ').replace(`@${msg.mentions[0].username} `, '') : Memer.randomInArray(henlo)
  } else if (msg.mentions.length === 0) {
    mention = msg.author.username
    text = args[0] ? args.join(' ') : Memer.randomInArray(henlo)
  } else {
    return msg.create('hmm, you seemed to find a way to break this. GG at beating my 5am brain.')
  }

  msg.channel.createMessage(`henlo ${mention}\nyou stinky ${mention}\ngo ${text} ugly`)
}

exports.props = {
  name: 'henlo',
  usage: '{command} @user thing to do',
  aliases: ['stinky'],
  cooldown: 1000,
  description: 'teach that stinky BOI a lesson'
}
