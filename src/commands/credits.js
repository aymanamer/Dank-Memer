exports.run = async function (Memer, msg) {
  msg.channel.createMessage({ embed: {
    color: Memer.randomColor(),
    author: { name: 'Dank Memer Credits' },
    description: '**Developers**\nMelmsie#0006, Aetheryx#2222, CyberRonin#5517\n**Contributors**\nKromatic#0420\n**Support Server Staff**\nKromatic\nLizard\nSquidaddy\nxXBuilderBXx\nAkko'
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
