const { GenericCommand } = require('../../models/')
const VENT_CID = '370674591556698112'

module.exports = new GenericCommand(
  async ({ Memer, msg, args, addCD }) => {
    await Memer.bot.createMessage(VENT_CID, { embed: {
      title: 'New Vent:',
      author: { name: `${msg.author.username}#${msg.author.discriminator} | ${msg.author.id}` },
      description: args.join(' '),
      fields: [{ name: 'Sent from:', value: `#${msg.channel.name} in ${msg.channel.guild.name}` }],
      color: Memer.randomColor(),
      footer: { text: `Guild ID: ${msg.channel.guild.id}` },
      timestamp: new Date()
    }})

    return 'MY owner is listening to your venting now, what a great listener. amirite girls???? 😍'
  }, {
    triggers: ['vent', 'bother', 'message'],
    description: 'I know I am your only friend, this should give you someone to vent to',
    cooldown: 15e3,

    missingArgs: 'What do you want to vent to me about?'
  }
)
