const snekfetch = require('snekfetch')
const config = require('../config.json')

exports.create = async (client, guild, utils) => {
	postStats()

	const embed = {
		color: utils.colors.lightblue,
		title: 'Hello!',
		description: utils.intro
	}

	guild.defaultChannel.send({
		embed: embed
	})
		.catch(err => {
			console.log(`Failed to send welcome message to ${guild.name}\n${err.message}`)
			guild.owner.send({
				embed: embed
			})
				.catch(err => console.log(`${err.stack}: The god damn guild owner couldn\'t get the message either`))
		})
}

exports.delete = async (client, guild, utils) => {
	postStats()
}

async function postStats() {
	const guilds = await client.shard.fetchClientValues('guilds.size')
	const count = guilds.reduce((prev, val) => prev + val, 0)
	snekfetch
		.post('https://bots.discord.pw/api/bots/270904126974590976/stats')
		.set('Authorization', config.pwtoken)
		.send({
			'server_count': count,
			'shard_count': client.shard.count
		})
		.end()

	snekfetch
		.post('https://discordbots.org/api/bots/270904126974590976/stats')
		.set('Authorization', config.orgtoken)
		.send({
			'server_count': count,
			'shard_count': client.shard.count
		})
		.end()
}