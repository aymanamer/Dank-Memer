const fs = require('fs')
const msgHandler = require('./handlers/msgHandler.js')
const botPackage = require('../package.json')
const { Base } = require('eris-sharder')

class Memer extends Base {
  constructor (bot) {
    super(bot)

    this.log = require('./utils/logger.js')
    this._snek = require('snekfetch')
    this._join = require('path').join
    this.config = require('./config.json')
    this.r = require('rethinkdbdash')()
    this.db = require('./utils/dbFunctions.js')(this)
    this.cmds = []
    this.tags = {}
    this.indexes = {
      'meme': {},
      'joke': {},
      'shitpost': {},
      'greentext': {}
    }
    Object.assign(this, require('./utils/misc.js'))
  }

  launch () {
    this.loadCommands()

    this.bot
      .on('ready', this.ready.bind(this))
      .on('guildCreate', this.guildCreate.bind(this))
      .on('guildDelete', this.guildDelete.bind(this))
      .on('messageCreate', msgHandler.handleMeDaddy.bind(this))
      .on('error', (error) => {
        this.log(error.stack, 'error')
      })

    this.ready()
  }

  ready () {
    this.bot.editStatus(null, {
      name: 'with my dad',
      type: 1,
      url: 'https://www.twitch.tv/m3lmsie'
    })

    this.mentionRX = new RegExp(`^<@!*${this.bot.user.id}>`)
  }

  loadCommands () {
    const path = './commands'
    const files = fs.readdirSync(path)

    for (const file of files) {
      try {
        const command = require(this._join(__dirname, path, file))
        command.props = Object.assign({
          usage: '{command}',
          cooldown: 1000,
          isNSFW: false,
          ownerOnly: false
        }, command.props, {
          perms: ['sendMessages'].concat(command.props.perms)
        })

        this.cmds.push(command)
      } catch (error) {
        this.log(`Failed to load command ${file}:\n${error.stack}`, 'error')
      }
    }

    // const tags = require('./tags.json')
    // Object.keys(tags).forEach(tag => {
    //   this.tags.set(tag, tags[tag])
    // })
  }

  guildCreate (guild) {
    const embed = {
      color: this.colors.lightblue,
      title: 'Hello!',
      description: this.intro
    }
    guild.channels.get(guild.channels.filter(c => c.type === 0).map(c => c.id)[0]).createMessage({ embed })
      .catch(() => {})
  }

  guildDelete (guild) {
    this.db.deleteGuild(guild.id)
  }

  get package () {
    return botPackage
  }
}

module.exports = Memer
