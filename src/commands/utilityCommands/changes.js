const { GenericCommand } = require('../../models/')

module.exports = new GenericCommand(
  () => 'See the most recent changes here: https://github.com/Dank-Memer/Dank-Memer/blob/master/changelog.txt',
  {
    triggers: ['changes', 'changelog'],
    description: 'Come check out our updates!'
  }
)
