const os = require('os')
exports.run = async function (client, msg, args, utils, config) {
	const startMeasure = cpuAverage()
	setTimeout(async () => {
		const endMeasure      = cpuAverage()
		const idleDifference  = endMeasure.idle - startMeasure.idle
		const totalDifference = endMeasure.total - startMeasure.total
		const percentageCPU   = 100 - ~~(100 * idleDifference / totalDifference)
		const guilds = (await client.shard.fetchClientValues('guilds.size')).reduce((a, b) => a + b)
		const users  = (await client.shard.fetchClientValues('users.size')).reduce((a, b) => a + b)
		const vcs    = (await client.shard.fetchClientValues('voiceConnections.size')).reduce((a, b) => a + b)

		await msg.channel.send({ embed: {
			color: utils.lightblue,
			title: `${client.user.username} - Stats (${config.version})`,
			description: `Uptime: ${timeCon(process.uptime())}`,
			fields: [
				{ name: 'Websocket Ping', value: `${client.ping.toFixed(0)} ms`, inline: true },
				{ name: 'CPU Usage', value: `${percentageCPU}% Usage`, inline: true },
				{ name: 'RAM Usage', value: `RSS: ${(process.memoryUsage().rss / 1048576).toFixed()}MB\nHeap: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB`, inline: true },
				{ name: 'Total Servers', value: guilds, inline: true },
				{ name: 'Total Users', value: users, inline: true },
				{ name: 'Active VCs', value: vcs, inline: true },
				{ name: 'Blacklisted Users', value: client.ids.blocked.user.length, inline: true },
				{ name: 'Blacklisted Servers', value: client.ids.blocked.guild.length, inline: true },
				{ name: 'Donor Count', value: client.ids.donors.donor1.length + client.ids.donors.donor5.length + client.ids.donors.donor10.length, inline: true }
			]
		}})
	}, 100)
}

function cpuAverage () {
	let totalIdle = 0,
		totalTick = 0
	const cpus = os.cpus()
	for (var i = 0, len = cpus.length; i < len; i++) {
		var cpu = cpus[i]
		for (const type in cpu.times)
			totalTick += cpu.times[type]
		totalIdle += cpu.times.idle
	}
	return {
		idle: totalIdle / cpus.length,
		total: totalTick / cpus.length
	}
}

function timeCon (time) {
	let days = Math.floor(time % 31536000 / 86400)
	let hours = Math.floor(time % 31536000 % 86400 / 3600)
	let minutes = Math.floor(time % 31536000 % 86400 % 3600 / 60)
	let seconds = Math.round(time % 31536000 % 86400 % 3600 % 60)
	days = days > 9 ? days : days
	hours = hours > 9 ? hours : hours
	minutes = minutes > 9 ? minutes : minutes
	seconds = seconds > 9 ? seconds : seconds
	return (parseInt(days) > 0 ? days + (days > 1 ? ' days ' : ' day ') : '') + (parseInt(hours) === 0 && parseInt(days) === 0 ? '' : hours + (hours > 1 ? ' hours ' : ' hour ')) + (parseInt(minutes) === 0 && parseInt(hours) === 0 && parseInt(days) === 0 ? '' : minutes + (minutes > 1 ? ' minutes ' : ' minute ')) + seconds + (seconds > 1 ? ' seconds ' : ' second ')
}