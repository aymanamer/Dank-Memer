const { GenericMediaCommand } = require('../../models/')

module.exports = new GenericMediaCommand({
  triggers: ['discordmeme', 'dscmeme', 'discord'],
  description: 'A random Discord-themed meme!',

  title: 'Random Discord Meme',
  message: 'powered by weeb shit (weeb.sh)',
  JSONKey: 'url',
  reqURL: 'https://api.weeb.sh/images/random?type=discord_memes',
  tokenKey: 'weeb'
})
