const config = require('../config.json')
const moment = require('moment')
require('moment-duration-format')

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

  intro: `Sup nerds. My name is Dank Memer.\n\nTo get started, send \`${config.defaultPrefix} help\`. All commands are run this way, for example, pls meme.\n\nI am maintained by Melmsie#0006, who can be found at [this server](https://discord.gg/3GNMJBG) if you need to talk to him.`,

  randomColor: () => {
    const letters = '0123456789'
    let color = ''
    for (let i = 0; i < 7; i++) {
      color += letters[Math.floor(Math.random() * 10)]
    }

    return color
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

  parseTime: (time, format) => {
    return moment.duration(parseInt(time), format || 'seconds').format('dd:hh:mm:ss')
  }
}
