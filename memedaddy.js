'use memes'
const guildHandler = require('./events/guildHandler.js')
const msgHandler = require('./events/msgHandler.js')
const config = require('./config.json')
const utils = require('./utils.js')
const Discord = require('discord.js')
const client = new Discord.Client({
	disableEveryone: true,
	messageCacheMaxSize: 80,
	disabledEvents: utils.disabledEvents
})

const metrics = require('datadog-metrics')
metrics.init({
	apiKey: config.datadog.APIkey,
	appKey: config.datadog.APPkey,
	flushIntervalSeconds: 10,
	prefix: 'dank.'
})


client.login(config.token)

client.on('message', async msg => {
	metrics.increment('messages.seen')
	msgHandler.handleMeDaddy(client, msg, utils, metrics)
})

client.on('guildCreate', async guild => {
	metrics.increment('guild.joined')
	guildHandler.create(client, guild, utils)
})

client.on('guildDelete', async guild => {
	metrics.increment('guild.left')
	guildHandler.delete(client, guild)
})

client.once('ready', () => {
	client.ids = require('./ids.json')
	client.user.setGame('hello', 'https://www.twitch.tv/melmsie')
	client.indexes = {
		'meme': {},
		'joke': {},
		'shitpost': {},
		'thonks':{}
	}

	setInterval(collectStats, 15000)

	console.log(`[${new Date()}] ${client.user.username} loaded on ${client.shard.id + 1} successfully.`)
})

process.on('uncaughtException', (err) => {
	metrics.increment('events.uncaughtExceptions')
	if (err.stack.startsWith('Error: Cannot find module')) {
		return
	}
	if (err.stack.startsWith('Error: socket hang up')) {
		metrics.increment('events.socket.hang.up')
		return
	}

	console.log(`Caught exception: ${err.stack}`)
})

async function collectStats() {
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