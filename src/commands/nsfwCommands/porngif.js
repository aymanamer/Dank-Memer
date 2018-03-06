const { GenericMediaCommand } = require('../../models/')

module.exports = new GenericMediaCommand({
  triggers: ['porngif', 'porn'],
  description: 'Basically a porn video but with gifs',
  isNSFW: true,

  title: 'Here, take some gifs ;)',
  message: 'Free nudes thanks to boobbot & tom <3',
  JSONKey: 'url',
  reqURL: 'https://boob.bot/api/v2/img/Gifs',
  tokenKey: 'porn'
})
