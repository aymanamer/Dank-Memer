exports.run = async function (Memer, msg) {
  msg.channel.createMessage({ embed: {
    color: Memer.randomColor(),
    author: { name: 'Dank Memer Credits' },
    description: '**Developers**\nMelmsie#0006, Aetheryx#2222, and DaJuukes#0001 \n**Contributors**\nCyberRonin#5517\n**Donors**\nAny donors who want to be on this list, just DM Melmsie!'
  }})
}

exports.props = {
  name: 'credits',
  usage: '{command}',
  aliases: ['helpers'],
  cooldown: 1000,
  description: 'Thanks to all of you!',
  perms: ['embedLinks']
}
