exports.run = async function (Memer, msg, args) {
  if (!args[0]) {
    const funemoji = msg.channel.permissionsOf(Memer.bot.user.id).has('externalEmojis') ? '<:feelsgreatman:326155536800284673>' : ':joy:'
    msg.channel.createMessage({
      embed: {
        color: Memer.colors.purple,
        title: 'Available Commands',
        description: 'Dank Memer has an official Rust server now. Look up "Dank Memer Official" to find it!',
        fields: [
          { name: `${funemoji} Fun Commands`, value: 'asktrump, boo, call, fart, greentext, henlo, joke, justright, kill, meme, memegen, mock, pupper, kitty, pun, porn, say, shitpost, spin' },
          { name: '📷 Image Manipulation', value: 'ban, batslap, brazzers, byemom, cancer, dank, delete, hitler, invert, jail, magik, pride, salty, shit, spank, trigger, warp' },
          { name: '🔧 Utilities and Information', value: 'clean, credits, disable, enable, feedback, help, patreon, ping, prefix, rust, stats, watch' },
          { name: '🖼 Image Tags', value: 'alone, doge, dolan, godno, kappa, lul, megusta, notsure, pepe, troll, wat ' }
        ],
        footer: { text: 'Remember to use commands with "pls command", e.g. pls meme' }
      }
    })
  } else {
    if (!Memer.cmds.has(args[0]) && !Memer.aliases.has(args[0])) {
      return
    }

    const prefix = (await Memer.db.getGuild(msg.channel.guild.id) || Memer.defaultGuildConfig).prefix

    const props = Memer.cmds.has(args[0]) ? Memer.cmds.get(args[0]).props : Memer.cmds.get(Memer.aliases.get(args[0])).props
    msg.channel.createMessage({ embed: {
      fields: [
        { 'name': 'Description:', 'value': props.description, inline: false },
        { 'name': 'Usage:', 'value': Memer.codeblock(props.usage.replace('{command}', `${prefix} ${props.name}`)), inline: false },
        { 'name': 'Aliases:', 'value': props.aliases[0] ? props.aliases.join(', ') : 'None', inline: false }
      ]
    } })
  }
}

exports.props = {
  name: 'help',
  usage: '{command}',
  aliases: ['cmds', 'commands'],
  cooldown: 1000,
  description: 'See a list of commands available.',
  perms: ['embedLinks']
}
