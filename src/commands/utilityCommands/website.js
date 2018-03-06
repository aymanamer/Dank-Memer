const { GenericCommand } = require('../../models/')

module.exports = new GenericCommand(
  () => 'http://dankmemer.lol/',
  {
    triggers: ['website', 'site'],
    description: 'Come check out our website!',
    perms: ['embedLinks']
  }
)
