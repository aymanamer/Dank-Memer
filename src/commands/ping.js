const { GenericCommand } = require('../models/')

module.exports = new GenericCommand(
  () => ({ description: 'no u *dabs on <@180093157554388993>*' }),
  {
    triggers: ['ping'],
    description: 'test cmd plz ignore'
  }
)
