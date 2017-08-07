const os = require('os')
exports.run = async function (Memer, msg) {
	const startMeasure = cpuAverage()
	setTimeout(async () => {
		const endMeasure      = cpuAverage()
		const idleDifference  = endMeasure.idle - startMeasure.idle
		const totalDifference = endMeasure.total - startMeasure.total
		const percentageCPU   = 100 - ~~(100 * idleDifference / totalDifference)

		await msg.channel.createMessage({ embed: {
			color: Memer.colors.lightblue,
			title: `${Memer.client.user.username} - Stats (${Memer.config.version})`,
			description: `Uptime: ${Memer.timeCon(process.uptime())}`,
			fields: [
				{ name: 'Websocket Ping', value: `${msg.channel.guild.shard.latency.toFixed()} ms`, inline: true },
				{ name: 'CPU Usage', value: `${percentageCPU}% Usage`, inline: true },
				{ name: 'RAM Usage', value: `RSS: ${(process.memoryUsage().rss / 1048576).toFixed()}MB\nHeap: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB`, inline: true },
				{ name: 'Total Servers', value: Memer.client.guilds.size, inline: true },
				{ name: 'Total Users', value: Memer.client.users.size, inline: true },
				{ name: 'Active VCs', value: Memer.client.voiceConnections.size, inline: true },
				{ name: 'Blacklisted Users', value: Memer.ids.blocked.user.length, inline: true },
				{ name: 'Blacklisted Servers', value: Memer.ids.blocked.guild.length, inline: true },
				{ name: 'Donor Count', value: Memer.ids.donors.donor1.length + Memer.ids.donors.donor5.length + Memer.ids.donors.donor10.length, inline: true }
			]
		}})
	}, 100)
}

function cpuAverage () {
	let totalIdle = 0,
		totalTick = 0
	const cpus = os.cpus()
	for (let i = 0, len = cpus.length; i < len; i++) {
		const cpu = cpus[i]
		for (const type in cpu.times) {
			totalTick += cpu.times[type]
		}
		totalIdle += cpu.times.idle
	}
	return {
		idle: totalIdle / cpus.length,
		total: totalTick / cpus.length
	}
}
