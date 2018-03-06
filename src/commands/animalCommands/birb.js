const { GenericMediaCommand } = require('../../models/')

module.exports = new GenericMediaCommand({
  triggers: ['birb', 'bird'],
  description: 'See some cute birbs!',

  title: '🐦',
  reqURL: 'https://random.birb.pw/tweet/',
  prependURL: 'https://random.birb.pw/img/'
})
