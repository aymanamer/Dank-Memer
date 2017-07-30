const snekfetch = require('snekfetch')
const config = require('../config.json')

exports.create = async(client, guild, utils) => {
	postStats(client.shard)

	const embed = {
		color: utils.colors.lightblue,
		title: 'Hello!',
		description: utils.intro
	}

	guild.defaultChannel.send({ embed })
		.catch(err => {
			console.log(`Failed to send welcome message to ${guild.name}\n${err.message}`)
			guild.owner.send({ embed: embed })
				.catch(err => console.log(`${err.stack}: The god damn guild owner couldn\'t get the message either`))
		})

	const str = `<:guildJoin:339203745571405825> Joined Guild: ${guild.name} | \`${guild.id}\` | Users: \`${guild.members.filter(m => !m.user.bot).size}\` - Bots: \`${guild.members.filter(m => m.user.bot).size}\` | ${new Date().toLocaleString()}`.replace(/'|"/g, '')
	client.shard.broadcastEval(`this.channels.has('338913214513283072') && this.channels.get('338913214513283072').send('${str}')`)
		.catch(err => console.log(`GUILDHANDLER.CREATE ERR: ${err.stack}`))
}

exports.delete = async(client, guild) => {
	const str = `<:guildLeave:339203746536095744> Removed Guild: ${guild.name} | \`${guild.id}\` | Users: \`${guild.members.filter(m => !m.user.bot).size}\` - Bots: \`${guild.members.filter(m => m.user.bot).size}\` | ${new Date().toLocaleString()}`.replace(/'|"/g, '')
	client.shard.broadcastEval(`this.channels.has('338913214513283072') && this.channels.get('338913214513283072').send('${str}')`)
		.catch(err => console.log(`GUILDHANDLER.DELETE ERR: ${err.stack}`))

	postStats(client.shard)
}

async function postStats(shard) {
	const guilds = await shard.fetchClientValues('guilds.size')
	const count = guilds.reduce((prev, val) => prev + val, 0)
	snekfetch
		.post('https://bots.discord.pw/api/bots/270904126974590976/stats')
		.set('Authorization', config.pwtoken)
		.send({
			'server_count': count
		})
		.end()

	snekfetch
		.post('https://discordbots.org/api/bots/270904126974590976/stats')
		.set('Authorization', config.orgtoken)
		.send({
			'server_count': count
		})
		.end()

	snekfetch.post('https://www.carbonitex.net/discord/data/botdata.php')
		.send({
			'key': config.carbon,
			'server_count': count
		})
		.end()
}