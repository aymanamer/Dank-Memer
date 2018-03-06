const { get } = require('snekfetch')
const { GenericCommand } = require('../../models')

module.exports = new GenericCommand(
  async ({ addCD }) => {
    const data = await get('http://api.icndb.com/jokes/random')

    await addCD()
    return {
      title: '👊 Chuck Norris 👊',
      description: data.body.value.joke.replace(/&quot;/g, '"')
    }
  }, {
    triggers: ['chucknorris', 'chuck', 'norris'],
    description: 'Let\'s learn about God',
    perms: ['embedLinks']
  }
)
