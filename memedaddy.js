'use memes'

const guildHandler = require('./events/guildHandler.js')
const msgHandler = require('./events/msgHandler.js')
const config = require('./config.json')
const utils = require('./utils.js')
const Eris = require('eris')
const client = new Eris.Client(config.token, {
	disableEvents: utils.disabledEvents,
	disableEveryone: true,
	messageLimit: 80
})

const metrics = require('datadog-metrics')
/*metrics.init({
	apiKey: config.datadog.APIkey,
	appKey: config.datadog.APPkey,
	flushIntervalSeconds: 10,
	prefix: 'dank.'
})*/


client.connect()

client.on('ready', () => {
	console.log(`Logged in as ${client.user.username}#${client.user.discriminator}.`)
})

client.on('messageCreate', (msg) => {
	// metrics.increment('messages.seen')
	if (!msg.channel.guild ||
	msg.author.bot) {
		return
	}

	if (msg.mentions.find(m => m.id === client.user.id) && msg.content.includes('help')) {
		return msg.channel.createMessage(`Hello, ${msg.author.username}. My prefix is \`${config.prefix}\`. Example: \`${config.prefix} meme\``)
	}

	if (!msg.content.toLowerCase().startsWith(config.prefix)) {
		return
	}

	msgHandler(client, msg, metrics)
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