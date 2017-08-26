const moment = require('moment')
require('moment-duration-format')
const package = require('../package.json')
exports.run = async function (Memer, msg) {
	await msg.channel.createMessage({
		embed: {
			color: '5881576',
			fields: [
				{
					name: '-------------------------------------- Technical ---------------------------------------',
					value: '```\n' +
					`Uptime          |   ${moment.duration(process.uptime(), 'seconds').format('dd:hh:mm:ss')}\n` +
					`Heap Used       |   ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB\n` +
					`Ping            |   ${msg.channel.guild.shard.latency.toFixed(0)}ms\n` +
					`Build           |   v${Memer.version}\n` +
					'\n```'
				},
				{
					name: '--------------------------------------- Statistics --------------------------------------',
					value: '```\n' +
					`Guilds          |   ${Memer.client.guilds.size}\n` +
					`Users           |   ${Memer.client.users.size}\n` +
					`Large Guilds    |   ${Memer.client.guilds.filter(m => m.large).length}\n` +
					`Exclusivity     |   ${Memer.client.guilds.filter(g => g.members.filter(m => m.bot).length === 1).length}\n`+
					'\n```'
				},
				{
					name: '-------------------------------------- Other Info --------------------------------------',
					value: '```\n' +
					`Node Version    |   ${process.version}\n` +
					`Dependencies    |   ${Object.keys(package.dependencies).length}\n` +
					`Platform        |   ${process.platform}\n` +
					'\n```'
				}
			]
		}
	})
}