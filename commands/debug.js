const os = require('os')
exports.run = async function (client, msg, args, config, EmbedBuilder) {
	const startMeasure = cpuAverage()
	setTimeout(async () => {
		const endMeasure      = cpuAverage()
		const idleDifference  = endMeasure.idle - startMeasure.idle
		const totalDifference = endMeasure.total - startMeasure.total
		const percentageCPU   = 100 - ~~(100 * idleDifference / totalDifference)
		const guilds = (await client.shard.fetchClientValues('guilds.size')).reduce((a, b) => a + b)
		const users  = (await client.shard.fetchClientValues('users.size')).reduce((a, b) => a + b)
		const vcs    = (await client.shard.fetchClientValues('voiceConnections.size')).reduce((a, b) => a + b)

		await msg.channel.send({
			embed: new EmbedBuilder()
				.setColor('#7d5bbe')
				.setTitle(`${client.user.username} - Stats (${config.version})`)
				.setDescription(`Uptime: ${timeCon(process.uptime())}`)
				.addField('Websocket Ping', `${client.ping.toFixed(0)} ms`, true)
				.addField('CPU Usage', `${percentageCPU}% Usage`, true)
				.addField('RAM Usage', `RSS: ${(process.memoryUsage().rss / 1048576).toFixed()}MB\nHeap: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB`, true)
				.addField('Total Servers', guilds, true)
				.addField('Total Users', users, true)
				.addField('Active VCs', vcs, true)
				.addField('Blacklisted Users', client.ids.blocked.user.length, true)
				.addField('Blacklisted Servers', client.ids.blocked.guild.length, true)
				.addField('Donor Count', client.ids.donors.donor1.length + client.ids.donors.donor5.length + client.ids.donors.donor10.length, true)
		})
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