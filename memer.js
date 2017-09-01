'use memes'

const msgHandler = require('./events/msgHandler.js')
const guildHandler = require('./events/guildHandler.js')
const MemerClass = require('./utils/memerClass.js')

const Memer = new MemerClass()

Memer.client.on('ready', () => {
	Memer.client.editStatus(null, {
		name: 'pls help',
		type: 1,
		url: 'https://www.twitch.tv/teamzars'
	})

	setTimeout(() => {
		console.log('Bot Restarting!')
		process.exit()
	}, 21000000)

	Memer.log(`Logged in as ${Memer.client.user.username}#${Memer.client.user.discriminator}.`)
})

Memer.client.on('guildCreate', async (guild) => {
	guildHandler.create(Memer, guild)
})

Memer.client.on('guildDelete', async (guild) => {
	guildHandler.delete(Memer, guild)
})

Memer.client.on('messageCreate', async (msg) => {
	if (!msg.channel.guild ||
	msg.author.bot ||
	Memer.ids.blocked.user.includes(msg.author.id) ||
	Memer.ids.blocked.channel.includes(msg.channel.id) ||
	Memer.ids.blocked.guild.includes(msg.channel.guild.id)) {
		return
	}

	const gConfig = await Memer.db.getGuild(msg.channel.guild.id) || await Memer.db.createGuild(msg.channel.guild.id)

	if (msg.mentions.find(m => m.id === Memer.client.user.id) && msg.content.toLowerCase().includes('help')) {
		return msg.channel.createMessage(`Hello, ${msg.author.username}. My prefix is \`${gConfig.prefix}\`. Example: \`${gConfig.prefix} meme\``)
	}

	if (!msg.content.toLowerCase().startsWith(gConfig.prefix)) {
		return
	}

	msgHandler.handleMeDaddy(Memer, msg, gConfig)
})

Memer.client.on('error', err => Memer.log(err.stack, 'error'))

process.on('uncaughtException', (err) => {
	if (err.stack.startsWith('Error: Cannot find module')) {
		return
	}

	Memer.log(`Caught exception: ${err.stack}`, 'error')
})

process.on('UnhandledPromiseRejectionWarning', (err) => {
	Memer.log(`Rejection: ${err.stack}`, 'error')
})