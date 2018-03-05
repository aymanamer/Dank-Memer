const { GenericMediaCommand } = require('../models/')

module.exports = new GenericMediaCommand({
  triggers: ['gayp', 'gayporn'],
  description: 'See some 4k nudes!',
  isNSFW: true,

  title: 'Here, take some gay porn.',
  message: 'Free nudes thanks to boobbot & tom <3',
  JSONKey: 'url',
  reqURL: 'https://boob.bot/api/v2/img/gay',
  tokenKey: 'porn'
})
