const Eris = require('eris')
const utils = require('./main.js')
const messageCollector = require('./messageCollector.js')
module.exports = class MemerClass {
	constructor () {
		this.db = {}
		for (const i in Object.keys(utils)) {
			this[Object.keys(utils)[i]] = utils[Object.keys(utils)[i]]
		}
		this.config = require('../config.json')
		this.client = new Eris.Client(this.config.token, {
			disableEvents: this.disabledEvents,
			disableEveryone: true,
			messageLimit: 100
		})
		this.client.connect()
		this.metrics = require('datadog-metrics')
		this.metrics.init({
			apiKey: this.config.datadog.APIkey,
			appKey: this.config.datadog.APPkey,
			flushIntervalSeconds: 10,
			prefix: 'test.'
		})
		this.ids = require('../ids.json')
		this.indexes = {
			'meme': {},
			'joke': {},
			'shitpost': {},
			'thonks':{}
		}
		this.snekfetch = require('snekfetch')
		this.r = require('rethinkdb')
		this.connection = null
		this.r.connect({ host: 'localhost', port: 28015 }, (err, conn) => {
			if (err) {throw err}
			this.connection = conn
		})
	}

	createMessageCollector (channel, filter, options) {
		const collector = new messageCollector(channel, filter, options)
		return new Promise(resolve => {
			collector.on('end', (collected, reason) => {
				resolve([collected, reason])
			})
		})
	}

	codeblock (str, lang) {
		return `${'```'}${lang || ''}\n${str}\n${'```'}`
	}

	reply (str, msg) {
		msg.channel.createMessage(`${msg.author.mention}, ${str}`)
	}

	createGuild (guild) { // All of these need to be moved to this.db when I know how to localize this to an external file :c
		return new Promise((resolve, reject) => {
			this.r.table('guilds')
				.insert({
					id: guild.id,
					prefix: this.config.defaultPrefix,
					disabledCommands: []
				})
				.run(this.connection, (err, res) => {
					console.log(res)
					if (err) {
						return reject(err)
					} else if (res.errors !== 0) {
						reject(res.first_error)
					} else {
						resolve(true)
					}
				})
		})
	}

	getGuild (guild) {
		return new Promise((resolve, reject) => {
			this.r.table('guilds')
				.get(guild.id)
				.run(this.connection)
				.then(res => {
					resolve(res)
				})
				.catch(err => {
					reject(err)
				})
		})
	}

	updateGuild (guildEntry) {
		return new Promise((resolve, reject) => {
			this.r.table('guilds')
				.insert(guildEntry, { conflict: 'update' })
				.run(this.connection, (err, res) => {
					console.log(res)
					if (err || !res || res.errors !== 0) {
						return reject(err)
					} else {
						resolve(JSON.stringify(guildEntry))
					}
				})
		})
	}
}