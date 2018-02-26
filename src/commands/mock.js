const { GenericCommand } = require('../models/')

module.exports = new GenericCommand(
  async ({ Memer, args }) => {
    return {
      content: args
        .join(' ')
        .replace(/c/gi, 'k')
        .replace(/v/gi, 'c')
        .split('')
        .map((c, i) => i % 2 ? c.toUpperCase() : c)
        .join(''),
      file: { file: Memer.mockIMG, name: 'mock.jpg' }
    }
  }, {
    triggers: ['mock'],
    description: 'Mock the stupid shit your friend says!',
    usage: '{command} <text to be mocked>',
    perms: ['attachFiles'],

    missingArgs: 'You gotta give me something to mock :eyes:'
  }
)
