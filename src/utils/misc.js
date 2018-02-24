const config = require('../config.json')

module.exports = {
  colors: {
    lightblue: '12054271',
    purple: '7869695',
    red: '16711680',
    green: '65280',
    blue: '255',
    black: '0',
    slate: '2500908',
    white: '16777215',
    yellow: '16250241'
  },

  roleIDs: {
    'base': '334171428649959447',
    '5': '344571417074991105',
    '10': '344571468715261952'
  },

  intro: `Sup nerds. My name is Dank Memer.\n\nTo get started, send \`${config.defaultPrefix} help\`. All commands are run this way, for example, pls meme.\n\nThere ARE NSFW commands on this bot, but you can disable them with \`pls disable nsfw\`I am maintained by Melmsie#0001, who can be found at [this server](https://discord.gg/ebUqc7F) if you need to talk to him.`,

  randomColor: () => {
    return Math.floor(Math.random() * 0xFFFFFF)
  },

  randomInArray: (array) => {
    return array[Math.floor(Math.random() * array.length)]
  },

  removeDuplicates: (array) => {
    return Array.from(new Set(array).values())
  },

  codeblock: (str, lang) => {
    return `${'```'}${lang || ''}\n${str}\n${'```'}`
  },

  parseTime: (time) => {
    const methods = [86400, 3600, 60, 1]
    const timeStr = [Math.floor(time / methods[0]).toString().padStart(2, '0')]
    for (let i = 0; i < 3; i++) {
      timeStr.push(Math.floor(time % methods[i] / methods[i + 1]).toString().padStart(2, '0'))
    }
    return timeStr.join(':')
  }
}
