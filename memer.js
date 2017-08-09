'use memes'

const msgHandler = require('./events/msgHandler.js')
const guildHandler = require('./events/guildHandler.js')
const MemerClass = require('./utils/memerClass.js')

const Memer = new MemerClass()

Memer.client.on('ready', () => {
	Memer.client.editStatus(null, { name: 'pls help me', type: 1, url: 'https://www.twitch.tv/melmsie' })

	console.log(`Logged in as ${Memer.client.user.username}#${Memer.client.user.discriminator}.`)

	setInterval(collectStats, 15000)
})

Memer.client.on('guildCreate', async (guild) => {
	Memer.metrics.increment('guild.joined')
	guildHandler.create(Memer, guild)
})

Memer.client.on('guildDelete', async (guild) => {
	Memer.metrics.increment('guild.left')
	guildHandler.delete(Memer, guild)
})

Memer.client.on('messageCreate', async (msg) => {
	Memer.metrics.increment('messages.seen')
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
	Memer.metrics.increment('events.uncaughtExceptions')
	if (err.stack.startsWith('Error: Cannot find module')) {
		return
	}
	if (err.stack.startsWith('Error: socket hang up')) {
		Memer.metrics.increment('events.socket.hang.up')
		return
	}

	console.log(`Caught exception: ${err.stack}`)
})

process.on('UnhandledPromiseRejectionWarning', (err) => {
	Memer.metrics.increment('events.unhandledrejection')
	console.log(`Rejection: ${err.stack}`)
})

async function collectStats () {
	const memUsage = process.memoryUsage()
	Memer.metrics.gauge('ram.rss', (memUsage.rss / 1048576).toFixed())
	Memer.metrics.gauge('ram.heapUsed', (memUsage.heapUsed / 1048576).toFixed())
	Memer.metrics.gauge('total.guilds', Memer.client.guilds.size)
	Memer.metrics.gauge('total.users', Memer.client.users.size)
	Memer.metrics.gauge('current.vcs', Memer.client.voiceConnections.size)
	Memer.metrics.gauge('current.uptime', process.uptime())
}