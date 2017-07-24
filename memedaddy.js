const guildHandler = require('./events/guildHandler.js')
const msgHandler = require('./events/msgHandler.js')
const config = require('./config.json')
const utils = require('./utils.js')
const Discord = require('discord.js')
const client = new Discord.Client({
	disableEveryone: true,
	messageCacheMaxSize: 100,
	disabledEvents: utils.disabledEvents
})


client.login(config.token)

client.on('message', async msg => {
	msgHandler.handleMeDaddy(client, msg, utils)
})

client.on('guildCreate', async guild => {
	guildHandler.create(client, guild, utils)
})

client.on('guildDelete', async guild => {
	guildHandler.delete(client, guild, utils)
})

client.once('ready', () => {

	client.ids = require('./ids.json')
	client.user.setGame('hello', 'https://www.twitch.tv/melmsie')
	client.indexes = {
		'meme': {},
		'joke': {},
		'shitpost': {}
	}

	console.log(`[${new Date()}] ${client.user.username} loaded on ${client.shard.id + 1} successfully.`)
})

process.on('uncaughtException', (err) => {
	if (err.stack.startsWith('Error: Cannot find module')) {
		return
	}
	console.log(`Caught exception: ${err.stack}`)
})
