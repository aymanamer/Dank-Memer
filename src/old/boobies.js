const { GenericMediaCommand } = require('../models/')

module.exports = new GenericMediaCommand({
  triggers: ['boobies', 'boobs'],
  description: 'See some cute ~~birbs~~ boobs!',
  isNSFW: true,

  title: 'Here, take some boobs.',
  message: 'Free nudes thanks to boobbot & tom <3',
  JSONKey: 'url',
  reqURL: 'https://boob.bot/api/v2/img/boobs',
  tokenKey: 'porn'
})
