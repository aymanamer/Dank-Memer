const fs = require('fs')
const msgHandler = require('./handlers/msgHandler.js')
const botPackage = require('../package.json')

class Memer {
	constructor (bot) {
		this.bot = bot
		this.log = require('./utils/logger.js')
		this._snek = require('snekfetch')
		this._join = require('path').join
		this.config = require('./config.json')
		this.r = require('rethinkdbdash')()
		this.db = require('./utils/dbFunctions.js')(this)
		this.cmds = new Map()
		this.aliases = new Map()
		this.tags = new Map()
		this.metrics = require('datadog-metrics')
		this.metrics.init({
			apiKey: this.config.datadog.APIkey,
			appKey: this.config.datadog.APPkey,
			flushIntervalSeconds: 10,
			prefix: 'dank.'
		})
		this.indexes = {
			'meme': {},
			'joke': {},
			'shitpost': {},
			'gt': {}
		}
		Object.assign(this, require('./utils/misc.js'))
	}

	launch () {
		this.loadCommands()

		this.bot
			.on('ready', this.ready.bind(this))
			.on('guildCreate', this.guildCreate.bind(this))
			.on('guildDelete', this.guildDelete.bind(this))
			.on('messageCreate', this.messageCreate.bind(this))
			.on('error', this.onError.bind(this))

		this.ready()
	}

	ready () {
		this.bot.editStatus(null, {
			name: 'pls help',
			type: 1,
			url: 'https://www.twitch.tv/teamzars'
		})
	}

	loadCommands () {
		const path = './commands'
		fs.readdir(path, (error, files) => {
			if (error) {
				return this.log(error.stack, 'error')
			}

			files.forEach(file => {
				try {
					const command = require(this._join(__dirname, path, file))
					this.cmds.set(command.props.name, command)
					command.props.aliases.forEach(alias => {
						this.aliases.set(alias, command.props.name)
					})
				} catch (error) {
					this.log(`Failed to load command ${file}:\n${error.stack}`, 'error')
				}
			})
		})

		const tags = require('./tags.json')
		Object.keys(tags).forEach(tag => {
			this.tags.set(tag, tags[tag])
		})
	}

	guildCreate (guild) {
		this.metrics.increment('guildCreate')
		const embed = {
			color: this.colors.lightblue,
			title: 'Hello!',
			description: this.intro
		}
		guild.channels.get(guild.channels.filter(c => c.type === 0).map(c => c.id)[0]).createMessage({ embed }) // DM owner instead?
			.catch(() => {})
	}

	guildDelete (guild) {
		this.metrics.increment('guildDelete')
		this.db.deleteGuild(guild.id)
		//datadog
	}

	get defaultGuildConfig () {
		return {
			prefix: this.config.defaultPrefix,
			disabledCommands: []
		}
	}

	get package () {
		return botPackage
	}

	async messageCreate (msg) {
		this.metrics.increment('messagesSeen')
		if (!msg.channel.guild ||
								msg.author.bot ||
								await this.db.isBlocked(msg.author.id, msg.channel.guild.id)) {
			return
		}

		const gConfig = await this.db.getGuild(msg.channel.guild.id) || this.defaultGuildConfig

		if (msg.mentions.find(m => m.id === this.bot.user.id) && msg.content.toLowerCase().includes('help')) {
			return msg.channel.createMessage(`Hello, ${msg.author.username}. My prefix is \`${gConfig.prefix}\`. Example: \`${gConfig.prefix} meme\``)
		}
		if (msg.content.toLowerCase().startsWith(gConfig.prefix)) {
			this.metrics.increment('commandsTotal')
			msgHandler.handleMeDaddy(this, msg, gConfig)
		}
	}

	onError (error) {
		this.log(error.stack, 'error')
	}
}

module.exports = Memer