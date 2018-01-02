exports.run = async function (Memer, msg) {
  const votes = await Memer._snek.get('https://discordbots.org/api/bots/270904126974590976/votes?onlyids=1').set('Authorization', Memer.config.orgtoken)
  if (!votes.body.includes(msg.author.id)) {
    msg.channel.createMessage({ embed: {
      color: Memer.colors.lightblue,
      author: { name: 'OWO whats this?' },
      thumbnail: { url: 'http://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/lock-icon.png' },
      description: 'To be able to see this **delicious content**, you must vote.\n\n[Click here to vote.](https://discordbots.org/bot/270904126974590976)',
      footer: { text: 'You also have to log in with discord on that page and hit the upvote button next to the name!' }
    }})
  } else {
    msg.channel.createMessage({ embed: {
      color: Memer.colors.lightblue,
      author: { name: 'Here\'s your fucking cookie' },
      description: '🍪',
      footer: { text: 'What did you expect, a fucking award?' }
    }})
  }
}

exports.props = {
  name: 'cookie',
  usage: '{command}',
  aliases: ['cake', 'vote'],
  cooldown: 1000,
  description: 'owo whats this',
  perms: ['embedLinks']
}