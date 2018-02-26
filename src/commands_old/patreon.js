exports.run = async function (Memer, msg) {
  msg.channel.createMessage({ embed: {
    title: 'Donate to Dank Memer on Patreon!',
    description: 'Help Melmsie keep the bot alive by donating to pay server costs!',
    url: 'https://www.patreon.com/melmsie',
    color: Memer.randomColor(),
    footer: { text: '"pls donut for my bot, im running low on money"' }
  }})
}

exports.props = {
  name: 'patreon',
  usage: '{command}',
  aliases: ['donate', 'gibmonies', 'pay', 'donut'],
  cooldown: 1000,
  description: 'See how you can donate to the bot and gain access to donor features!',
  perms: ['embedLinks']
}
