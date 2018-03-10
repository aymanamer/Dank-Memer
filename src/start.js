/* eslint-disable */
global.memeBase = {
  Base: class Base {
    constructor (bot) {
      this.bot = bot
    }
  }
}

const MainClass = require('./mainClass.js')
const Eris = require('eris')
const config = require('./config.json')

process.send = ({ name, msg }) => {
  console.log(msg)
}

const bot = new Eris(config.token)
bot.connect().then(() => {
  const memer = new MainClass(bot)
  memer.launch()
})