const { GenericCommand } = require('../../models/')

module.exports = new GenericCommand(
  async ({msg}) => ({ description: `no u *dabs on <@${msg.author.id}>*` }),
  {
    triggers: ['ping'],
    description: 'test cmd plz ignore'
  }
)
