exports.run = function (Memer, msg) {
  msg.channel.createMessage({ embed: {
    color: Memer.randomColor(),
    author: { name: 'Watch Melmsie Stream!' },
    thumbnail: {
      url: 'https://avatars1.githubusercontent.com/u/20218284?v=4&s=460' },
    description: `Melmsie streams tons of different games, [come check it out!](https://www.twitch.tv/m3lmsie)`
  }})
}

exports.props = {
  name: 'watch',
  usage: '{command}',
  aliases: ['twitch', 'stream'],
  cooldown: 1000,
  description: 'Watch the developer of this bot stream.',
  perms: ['embedLinks']
}
