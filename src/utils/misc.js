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

  intro: `Sup nerds. My name is **Dank Memer**.\n\nTo get started, send \`${config.defaultPrefix} help\`. All commands are run this way, for example, pls meme.\n\nThere ARE NSFW commands on this bot, but you can disable them with \`pls disable nsfw\`\n\nI am maintained by Melmsie#0001, who can be found at [this server](https://discord.gg/ebUqc7F) if you need to talk to him.`,

  links: '[Support Server](https://discord.gg/ebUqc7F) - Get help for the bot and meme around\n[Official Twitter](https://twitter.com/dankmemerbot) - Sometimes win free stuff and meme around\n[Owner\'s Stream](https://www.twitch.tv/m3lmsie) - Ask the bot owner questions live and meme around\n[Invite Link](https://goo.gl/BPWvB9) - Add the bot to another server and meme around',

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
    const methods = [
      { name: ' d', count: 86400 },
      { name: ' hrs', count: 3600 },
      { name: ' min', count: 60 },
      { name: ' sec', count: 1 }
    ]

    const timeStr = [ Math.floor(time / methods[0].count).toString() + methods[0].name ]
    for (let i = 0; i < 3; i++) {
      timeStr.push(Math.floor(time % methods[i].count / methods[i + 1].count).toString() + methods[i + 1].name)
    }
    return timeStr.join(', ')
  }
}
