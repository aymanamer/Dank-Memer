const { GenericCommand } = require('../models/')
const { trumpPhotos, trumpResponses } = require('../assets/arrays.json')

const questionRegex = /\?/g

module.exports = new GenericCommand(
  async ({ Memer, msg, args, addCD }) => {
    args = args.join(' ')
    const qLength = (args.match(questionRegex) || []).length

    await addCD()
    return {
      thumbnail: { url: Memer.randomInArray(trumpPhotos) },
      description: `\n${msg.author.username}: ${args}\n\nTrump: ${Memer.randomInArray(trumpResponses).toUpperCase()}${'!'.repeat(qLength)}`
    }
  },
  {
    triggers: ['asktrump', 'trump', 'donald'],
    usage: '{command} <question>',
    description: 'Ask the president whatever you\'d like!',
    perms: ['embedLinks'],

    missingArgs: 'You gotta give me something to ask Trump :eyes:'
  }
)
