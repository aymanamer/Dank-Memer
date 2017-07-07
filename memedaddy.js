const config = require('./config.json')
const snekfetch = require('snekfetch')
const Discord = require('discord.js')
const client = new Discord.Client({
	disableEveryone: true,
	disabledEvents: ['CHANNEL_PINS_UPDATE', 'USER_SETTINGS_UPDATE', 'USER_NOTE_UPDATE', 'RELATIONSHIP_ADD', 'RELATIONSHIP_REMOVE', 'GUILD_BAN_ADD', 'GUILD_BAN_REMOVE', 'MESSAGE_UPDATE', 'MESSAGE_DELETE_BULK', 'MESSAGE_REACTION_REMOVE', 'MESSAGE_REACTION_REMOVE_ALL']
})
const aliases = require('./cmdConfig.json').aliases

client.login(config.token)

const cooldowns = {
	active: {},
	times: require('./cmdConfig.json').cooldowns
}

client.on('message', msg => {
	if (msg.channel.type === 'dm' || msg.author.bot ||
		client.ids.blocked.user.includes(msg.author.id) ||
		client.ids.blocked.channel.includes(msg.channel.id) ||
		client.ids.blocked.guild.includes(msg.guild.id)) return

	if (msg.isMentioned(client.user.id) && msg.content.includes('help'))
		return msg.channel.send(`Hello, ${msg.author.username}. My prefix is \`pls\`. Example: \`pls meme\``)

	if (!msg.content.toLowerCase().startsWith(config.prefix)) return

	if (!cooldowns.active[msg.author.id])
		cooldowns.active[msg.author.id] = []

	let command = msg.content.slice(config.prefix.length + 1).toLowerCase().split(' ')[0]
	const args = msg.content.split(' ').slice(2)

	if (aliases[command])
		command = aliases[command]

	if (!command) return

	if (cooldowns.active[msg.author.id].includes(command)) {
		if (cooldowns.active[msg.author.id].includes('annoy'))
			return msg.channel.send('After annoying someone, it is an hour until you can annoy someone again!\nIf you\'re a donor, you get to use it 75% faster!')

		if (cooldowns.active[msg.author.id].includes('tweet'))
			return msg.channel.send('After tweeting, it is 15 minutes until you can tweet again!\nIf you\'re a donor, you get to use it 75% faster!')

		if (cooldowns.active[msg.author.id].includes('spam'))
			return msg.channel.send('After spamming, it is 10 minutes until you can spam again.')

		return msg.channel.send('This command is currently in cooldown. Try again in a few seconds.\nIf you\'re a donor, you get to use it 75% faster!')
	}

	if (!config.devs.includes(msg.author.id))
		cooldowns.active[msg.author.id].push(command)

	setTimeout(() => {
		cooldowns.active[msg.author.id].splice(cooldowns.active[msg.author.id].indexOf(command), 1)
	}, config.donor1.concat(config.donor5, config.donor10).includes(msg.author.id) ? cooldowns.times[command] * 0.25 : cooldowns.times[command])

	try {
		delete require.cache[require.resolve(`./commands/${command}`)]

		if (!msg.channel.permissionsFor(client.user.id).has(['SEND_MESSAGES', 'EMBED_LINKS']))
			return msg.author.send(`I either don\'t have permission to send messages or I don\'t have permission to embed links in #${msg.channel.name}`).catch(err => {
				console.log(err.stack)
			})

		require(`./commands/${command}`).run(client, msg, args, config, Discord)

	} catch (e) {
		if (e.message.includes('Cannot find module')) return
		return console.log(e)
	}

})

client.on('guildCreate', async(guild) => {
	const guilds = await client.shard.fetchClientValues('guilds.size')
	const count = guilds.reduce((prev, val) => prev + val, 0)

	snekfetch
		.post('https://bots.discord.pw/api/bots/270904126974590976/stats')
		.set('Authorization', config.pwtoken)
		.send({
			'server_count': count
		})
		.then(console.log('Updated dbots status.'))

	snekfetch
		.post('https://discordbots.org/api/bots/270904126974590976/stats')
		.set('Authorization', config.orgtoken)
		.send({
			'server_count': count
		})
		.then(console.log('Updated dbots status.'))

	guild.defaultChannel.send({
		embed: new Discord.RichEmbed()
			.setColor('#656fff')
			.setTitle('Hello!')
			.setDescription(`My name is ${client.user.username}.\n\nTo get started, send \`pls help\`.\n\nI am maintained by Melmsie#0006, who can be found at [this server](https://discord.gg/3GNMJBG) if you need to talk to him.`)
	}).catch(e => {
		console.log(`Failed to send welcome message to ${guild.name}\n${e.message}`)
		guild.owner.send({
			embed: new Discord.RichEmbed()
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

client.on('error', console.error)
client.on('warn', console.warn)