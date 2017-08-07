'use memes'

const msgHandler = require('./events/msgHandler.js')
const guildHandler = require('./events/guildHandler.js')
const Eris = require('eris')
const utils = require('./utils.js')
class MemerClass {
	constructor () {
		for (const i in Object.keys(utils)) {
			this[Object.keys(utils)[i]] = utils[Object.keys(utils)[i]]
		}
		this.config = require('./config.json')
		this.client = new Eris.Client(this.config.token, {
			disableEvents: this.disabledEvents,
			disableEveryone: true,
			messageLimit: 80
		})
		this.client.connect()
		this.metrics = require('datadog-metrics')
		/*metrics.init({
			apiKey: this.config.datadog.APIkey,
			appKey: this.config.datadog.APPkey,
			flushIntervalSeconds: 10,
			prefix: 'dank.'
		})*/
		this.ids = require('./ids.json')
		this.indexes = {
			'meme': {},
			'joke': {},
			'shitpost': {},
			'thonks':{}
		}
		this.snekfetch = require('snekfetch')
	}
}


const Memer = new MemerClass()

Memer.client.on('ready', () => {
	Memer.client.editStatus(null, { name: 'hello', type: 1, url: 'https://www.twitch.tv/melmsie' })

	console.log(`Logged in as ${Memer.client.user.username}#${Memer.client.user.discriminator}.`)

	// setInterval(collectStats, 15000)
})

Memer.client.on('guildCreate', async (guild) => {
	// metrics.increment('guild.joined')
	guildHandler.create(Memer, guild)
})

Memer.client.on('guildDelete', async (guild) => {
	// metrics.increment('guild.left')
	guildHandler.delete(Memer, guild)
})

Memer.client.on('messageCreate', (msg) => {
	// metrics.increment('messages.seen')
	if (!msg.channel.guild ||
	msg.author.bot ||
	Memer.ids.blocked.user.includes(msg.author.id) ||
	Memer.ids.blocked.channel.includes(msg.channel.id) ||
	Memer.ids.blocked.guild.includes(msg.channel.guild.id)) {
		return
	}

	if (msg.mentions.find(m => m.id === Memer.client.user.id) && msg.content.toLowerCase().includes('help')) {
		return msg.channel.createMessage(`Hello, ${msg.author.username}. My prefix is \`${Memer.config.prefix}\`. Example: \`${Memer.config.prefix} meme\``)
	}

	if (!msg.content.toLowerCase().startsWith(Memer.config.prefix)) {
		return
	}

	msgHandler.handleMeDaddy(Memer, msg)
})

process.on('uncaughtException', (err) => {
//	metrics.increment('events.uncaughtExceptions')
	if (err.stack.startsWith('Error: Cannot find module')) {
		return
	}
	if (err.stack.startsWith('Error: socket hang up')) {
//		metrics.increment('events.socket.hang.up')
		return
	}

	console.log(`Caught exception: ${err.stack}`)
})

async function collectStats () {
	const guilds = (await client.shard.fetchClientValues('guilds.size')).reduce((a, b) => a + b)
	const users = (await client.shard.fetchClientValues('users.size')).reduce((a, b) => a + b)
	const vcs = (await client.shard.fetchClientValues('voiceConnections.size')).reduce((a, b) => a + b)
	const memUsage = process.memoryUsage()
	metrics.gauge(`ram${client.shard.id}.rss`, (memUsage.rss / 1048576).toFixed())
	metrics.gauge(`ram${client.shard.id}.heapUsed`, (memUsage.heapUsed / 1048576).toFixed())
	metrics.gauge('total.guilds', guilds)
	metrics.gauge('total.users', users)
	metrics.gauge('current.vcs', vcs)
	metrics.gauge('current.uptime', process.uptime())
}