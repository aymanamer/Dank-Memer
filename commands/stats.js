const os = require('os')

exports.run = async function (client, msg, undefined, config, Discord) {
	let startMeasure = cpuAverage()
	setTimeout(async function () {
		let endMeasure = cpuAverage()
		let idleDifference = endMeasure.idle - startMeasure.idle
		let totalDifference = endMeasure.total - startMeasure.total
		let percentageCPU = 100 - ~~(100 * idleDifference / totalDifference)

		const guilds = (await client.shard.fetchClientValues('guilds.size')).reduce((a, b) => a + b)
		const vcs = (await client.shard.fetchClientValues('voiceConnections.size')).reduce((a, b) => a + b)
		const users = (await client.shard.fetchClientValues('users.size')).reduce((a, b) => a + b)

		await msg.channel.send({
			embed: new Discord.RichEmbed()
				.setColor('#7d5bbe')
				.setTitle(`${client.user.username} - Stats (${config.version})`)
				.setDescription(`Uptime: ${timeCon(process.uptime())}`)
				.addField('Websocket Ping', `${(client.ping).toFixed(0)} ms`, true)
				.addField('CPU', percentageCPU + '% Usage', true)
				.addField('RAM Usage', `RSS: ${(process.memoryUsage().rss / 1048576).toFixed()}MB\nHeap: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB`, true)
				.addField('Total Servers', guilds, true)
				.addField('Total Users', users, true)
				.addField('Active VCs', vcs, true)
		})
	}, 100)
}

function timeCon(time) {
	let days = Math.floor((time % 31536000) / 86400)
	let hours = Math.floor(((time % 31536000) % 86400) / 3600)
	let minutes = Math.floor((((time % 31536000) % 86400) % 3600) / 60)
	let seconds = Math.round((((time % 31536000) % 86400) % 3600) % 60)
	days = days > 9 ? days : days
	hours = hours > 9 ? hours : hours
	minutes = minutes > 9 ? minutes : minutes
	seconds = seconds > 9 ? seconds : seconds
	return (parseInt(days) > 0 ? days + (days > 1 ? ' days ' : ' day ') : '') + (parseInt(hours) === 0 && parseInt(days) === 0 ? '' : hours + (hours > 1 ? ' hours ' : ' hour ')) + (parseInt(minutes) === 0 && parseInt(hours) === 0 && parseInt(days) === 0 ? '' : minutes + (minutes > 1 ? ' minutes ' : ' minute ')) + seconds + (seconds > 1 ? ' seconds ' : ' second ')
}

function cpuAverage() {
	let totalIdle = 0, totalTick = 0
	let cpus = os.cpus()
	for (let i = 0, len = cpus.length; i < len; i++) {
		let cpu = cpus[i]
		for (type in cpu.times) {
			totalTick += cpu.times[type]
		}
		totalIdle += cpu.times.idle
	}
	return { idle: totalIdle / cpus.length, total: totalTick / cpus.length }
}