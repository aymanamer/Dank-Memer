const { GenericCommand } = require('../models')

module.exports = new GenericCommand(
  async ({ Memer, msg, args, addCD }) => {
    const command = Memer.cmds.find(c => c.props.triggers.includes(args[0]))
    if (!command) {
      return
    }

    const prefix = (await Memer.db.getGuild(msg.channel.guild.id) || Memer.defaultGuildConfig).prefix

    await addCD()
    return {
      fields: [
        { 'name': 'Description:', 'value': command.props.description },
        { 'name': 'Usage:', 'value': Memer.codeblock(command.props.usage.replace('{command}', `${prefix} ${command.props.triggers[0]}`)) },
        { 'name': 'Triggers:', 'value': command.props.triggers.join(', ') }
      ]
    }
  },
  {
    triggers: ['help', 'cmds', 'commands'],
    description: 'See a list of commands available.',
    perms: ['embedLinks'],

    missingArgs: {
      title: 'Available Commands',
      description: 'Do pls changes to see what\'s in the new update!',
      fields: [
        { name: `😂 Fun Commands`, value: 'asktrump, chucknorris, dankrate, discordmeme, google, greentext, joke, kill, meme, memegen, mock, pun, ratewaifu, roast, say, shitpost, vent, xkcd' },
        { name: '📷 Image Manipulation', value: 'b1nzy, ban, batslap, brazzers, byemom, cancer, cry, delete, egg, hitler, jail, magik, pride, rip, salty, search, shit, spank, trigger, tweet, warp' },
        { name: '🐕 Animal Commands', value: 'birb, kitty, lizzyboi, pupper, redpanda' },
        { name: '🔊 Voice Commands', value: 'airhorn, boo, fart, knock, mememusic, mlgmusic, oof' },
        { name: '😏 NSFW Commands', value: 'boobies, booty, porngif' },
        { name: '💰 Currency Commands', value: 'coins, daily' },
        { name: '🔧 Utilities and Information', value: 'changes, clean, credits, disable, enable, help, invite, patreon, prefix, stats, website' }
      ],
      footer: { text: 'Hello darkness my old friend...' }
    }
  }
)
