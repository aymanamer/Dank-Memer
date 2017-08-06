const os = require('os')
exports.run = async function (Memer, msg) {
	const startMeasure = cpuAverage()
	setTimeout(async () => {
		const endMeasure      = cpuAverage()
		const idleDifference  = endMeasure.idle - startMeasure.idle
		const totalDifference = endMeasure.total - startMeasure.total
		const percentageCPU   = 100 - ~~(100 * idleDifference / totalDifference)

		await msg.channel.send({ embed: {
			color: Memer.colors.lightblue,
			title: `${client.user.username} - Stats (${Memer.config.version})`,
			description: `Uptime: ${Memer.timeCon(process.uptime())}`,
			fields: [
				{ name: 'Websocket Ping', value: `${client.ping.toFixed(0)} ms`, inline: true },
				{ name: 'CPU Usage', value: `${percentageCPU}% Usage`, inline: true },
				{ name: 'RAM Usage', value: `RSS: ${(process.memoryUsage().rss / 1048576).toFixed()}MB\nHeap: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB`, inline: true },
				{ name: 'Total Servers', value: client.guilds.size, inline: true },
				{ name: 'Total Users', value: client.users.size, inline: true },
				{ name: 'Active VCs', value: client.voiceConnections.size, inline: true },
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
