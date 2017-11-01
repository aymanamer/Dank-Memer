
exports.run = async function (Memer, msg) {
  msg.channel.createMessage({ embed: {
    color: Memer.colors.lightblue,
    author: { name: 'BoobBot Approves', icon_url: 'https://cdn.discordapp.com/app-icons/285480424904327179/3b0ddd147a565307705b6735c45ef448.jpg' },
    title: 'Do I look like a fucking porn bot to you? Fucking click these.',
    description: '<:boobblob:375031062000304129> Server: [Click here](https://discord.gg/SPArpWN)\n<:boobblob:375031062000304129> Bot: [Click here](https://bot.discord.io/boobbot "Pictures of nature. ❤")',
    footer: { text: 'Yes, boobbot is holding me hostage. Shhhhh' }
  }})
}

exports.props = {
  name: 'porn',
  usage: '{command}',
  aliases: ['vote', 'upvote'],
  cooldown: 1000,
  description: 'owo whats this',
  perms: ['embedLinks']
}
