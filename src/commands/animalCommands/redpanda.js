const { GenericCommand } = require('../../models/')
const { redpandas } = require('../../assets/animals.json')

module.exports = new GenericCommand(
  async ({ Memer, msg }) => ({
    title: 'dawwwwwwww 🐼',
    image: { url: Memer.randomInArray(redpandas) },
    footer: { text: `Requested by ${msg.author.username}#${msg.author.discriminator}` }
  }), {
    triggers: ['redpanda', 'redboi'],
    description: 'See some cute red pandas!',
    perms: ['embedLinks']
  }
)
