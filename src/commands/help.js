exports.run = async function (Memer, msg, args) {
  if (!args[0]) {
  
    msg.channel.createMessage({
      embed: {
        color: Memer.colors.purple,
        title: 'Available Commands',
        description: 'Do pls changes to see what\'s in the new update!',
        fields: [
          { name: `😂 Fun Commands`, value: 'asktrump, chucknorris, dankrate, discordmeme, google, greentext, joke, kill, meme, memegen, mock, pun, ratewaifu, roast, say, shitpost, vent, xkcd' },
          { name: '📷 Image Manipulation', value: 'b1nzy, ban, batslap, brazzers, byemom, cancer, cry, delete, egg, hitler, jail, magik, pride, rip, salty, search, shit, spank, trigger, tweet, warp' },
          { name: '🐕 Animal Commands', value: 'birb, kitty, lizzyboi, pupper, redpanda' },
          { name: '🔊 Voice Commands', value: 'airhorn, boo, fart, knock, mememusic, mlgmusic, oof' },
          { name: '😏 NSFW Commands', value: 'boobies, booty, porngif' },
          { name: '🔧 Utilities and Information', value: 'changes, clean, credits, disable, enable, help, invite, patreon, prefix, stats, website' }
        ],
        footer: { text: 'Hello darkness my old friend...' }
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
