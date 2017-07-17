/* eslint-disable curly */
const config = require('./config.json')
const snekfetch = require('snekfetch')
const { Client, RichEmbed } = require('discord.js')
const client = new Client({
	disableEveryone: true,
	messageCacheMaxSize: 100,
	disabledEvents: ['CHANNEL_PINS_UPDATE', 'USER_SETTINGS_UPDATE', 'USER_NOTE_UPDATE', 'RELATIONSHIP_ADD', 'RELATIONSHIP_REMOVE', 'GUILD_BAN_ADD', 'GUILD_BAN_REMOVE', 'MESSAGE_UPDATE', 'MESSAGE_DELETE_BULK', 'MESSAGE_REACTION_REMOVE', 'MESSAGE_REACTION_REMOVE_ALL']
})
const { aliases, cds, cdmessages } = require('./cmdConfig.json')

client.login(config.token)

const cooldowns = {
	active: {},
	times: cds
}

const dogapi = require('dogapi')
const options = {
	api_key: '8827dd750efb8cec8a656985e4974413',
	app_key: 'f8d6a3ac647bc9a6caece15a9aadef20aa08f1f4',
}
dogapi.initialize(options)


client.on('message', async (msg) => {

	if (msg.channel.type === 'dm' || msg.author.bot ||
		client.ids.blocked.user.includes(msg.author.id) ||
		client.ids.blocked.channel.includes(msg.channel.id) ||
		client.ids.blocked.guild.includes(msg.guild.id)) return

	let command = msg.content.slice(config.prefix.length + 1).toLowerCase().split(' ')[0]
	const args = msg.content.split(' ').slice(2)

	if (msg.isMentioned(client.user.id) && msg.content.includes('help'))
		return msg.channel.send(`Hello, ${msg.author.username}. My prefix is \`pls\`. Example: \`pls meme\``)

	if (!msg.content.toLowerCase().startsWith(config.prefix) || !command) return

	if (!cooldowns.active[msg.author.id])
		cooldowns.active[msg.author.id] = []

	if (aliases[command])
		command = aliases[command]


	const guilds = (await client.shard.fetchClientValues('guilds.size')).reduce((a, b) => a + b)
	const users = (await client.shard.fetchClientValues('users.size')).reduce((a, b) => a + b)
	const vcs = (await client.shard.fetchClientValues('voiceConnections.size')).reduce((a, b) => a + b)
	const ram = (process.memoryUsage().rss / 1048576).toFixed()

	const now = parseInt(new Date().getTime() / 1000)
	const metrics = [
		{
			metric: 'memer.guilds',
			points: [now, guilds]
		},
		{
			metric: 'memer.users',
			points: [now, users]
		},
		{
			metric: 'memer.vcs',
			points: [now, vcs]
		},
		{
			metric: `shard${client.shard.id}.ram`,
			points: [now, ram]
		}
	]
	dogapi.metric.send_all(metrics)


	if (cooldowns.active[msg.author.id].includes(command)) {
		if (Object.keys(cdmessages).includes(command)) {
			return msg.channel.send(cdmessages[command])
		}
		else {
			return msg.channel.send('This command is currently in cooldown. Try again in a few seconds.\nIf you\'re a donor, you get to use it 75% faster!')
		}
	}

	try {
		delete require.cache[require.resolve(`./commands/${command}`)]

		if (!msg.channel.permissionsFor(client.user.id).has(['SEND_MESSAGES', 'EMBED_LINKS']))
			return msg.author.send(`I either don't have permission to send messages or I don't have permission to embed links in ${msg.channel.toString()}`).catch(err => {
				console.log(err.stack)
			})

		const commandFn = require(`./commands/${command}`).run

		if (commandFn.constructor.name === 'AsyncFunction') {
			commandFn(client, msg, args, config, RichEmbed).then(res => {
				if (res && !config.devs.includes(msg.author.id)) {
					cooldowns.active[msg.author.id].push(command)
					setTimeout(() => {
						cooldowns.active[msg.author.id].splice(cooldowns.active[msg.author.id].indexOf(command), 1)
					}, client.ids.donors.donor1.concat(client.ids.donors.donor5, client.ids.donors.donor10).includes(msg.author.id) ? cooldowns.times[command] * 0.25 : cooldowns.times[command])
				}
			})
		} else {
			if (commandFn(client, msg, args, config, RichEmbed)) {
				cooldowns.active[msg.author.id].push(command)
				setTimeout(() => {
					cooldowns.active[msg.author.id].splice(cooldowns.active[msg.author.id].indexOf(command), 1)
				}, client.ids.donors.donor1.concat(client.ids.donors.donor5, client.ids.donors.donor10).includes(msg.author.id) ? cooldowns.times[command] * 0.25 : cooldowns.times[command])
			}
		}
	} catch (e) {
		if (e.stack.startsWith('Error: Cannot find module')) return
		return console.log(e)
	}
})

client.on('guildCreate', async (guild) => {
	const guilds = await client.shard.fetchClientValues('guilds.size')
	const count = guilds.reduce((prev, val) => prev + val, 0)

	snekfetch
		.post('https://bots.discord.pw/api/bots/270904126974590976/stats')
		.set('Authorization', config.pwtoken)
		.send({
			'server_count': count,
			'shard_count': client.shard.count
		})
		.then(console.log('Updated dbots.pw status.'))

	snekfetch
		.post('https://discordbots.org/api/bots/270904126974590976/stats')
		.set('Authorization', config.orgtoken)
		.send({
			'server_count': count,
			'shard_count': client.shard.count
		})
		.then(console.log('Updated dbots.org status.'))

	guild.defaultChannel.send({
		embed: new RichEmbed()
			.setColor('#656fff')
			.setTitle('Hello!')
			.setDescription(`My name is ${client.user.username}.\n\nTo get started, send \`pls help\`.\n\nI am maintained by Melmsie#0006, who can be found at [this server](https://discord.gg/3GNMJBG) if you need to talk to him.`)
	}).catch(e => {
		console.log(`Failed to send welcome message to ${guild.name}\n${e.message}`)
		guild.owner.send({
			embed: new RichEmbed()
				.setColor('#656fff')
				.setTitle('Hello!')
				.setDescription(`My name is ${client.user.username}.\n\nTo get started, send \`pls help\` in your server.\n\nI am maintained by Melmsie#0006, who can be found at [this server](https://discord.gg/3GNMJBG) if you need to talk to him.`)
		}).catch(() => console.log('The god damn guild owner couldn\'t get the message either'))
	})
})



client.once('ready', () => {
	console.log(`[${new Date()}] ${client.user.username} loaded successfully.`)

	client.indexes = {
		'meme': {},
		'joke': {},
		'shitpost': {}
	}

	client.ids = require('./ids.json')

	client.user.setGame('hello', 'https://www.twitch.tv/melmsie')
})

process.on('uncaughtException', (err) => {
	if (err.stack.startsWith('Error: Cannot find module')) return
	console.log(`Caught exception: ${err.stack}`)
})