
var os = require("os");
exports.run = async function (client, msg, args, config, Discord) {


	//Create function to get CPU information
	function cpuAverage() {

		//Initialise sum of idle and time of cores and fetch CPU info
		var totalIdle = 0, totalTick = 0;
		var cpus = os.cpus();

		//Loop through CPU cores
		for (var i = 0, len = cpus.length; i < len; i++) {

			//Select CPU core
			var cpu = cpus[i];

			//Total up the time in the cores tick
			for (type in cpu.times) {
				totalTick += cpu.times[type];
			}

			//Total up the idle time of the core
			totalIdle += cpu.times.idle;
		}

		//Return the average Idle and Tick times
		return { idle: totalIdle / cpus.length, total: totalTick / cpus.length };
	}

	//Grab first CPU Measure
	var startMeasure = cpuAverage();

	//Set delay for second Measure
	setTimeout(async function () {

		//Grab second Measure
		var endMeasure = cpuAverage();

		//Calculate the difference in idle and total time between the measures
		var idleDifference = endMeasure.idle - startMeasure.idle;
		var totalDifference = endMeasure.total - startMeasure.total;

		//Calculate the average percentage CPU usage
		var percentageCPU = 100 - ~~(100 * idleDifference / totalDifference);

		//Output result to console
		

		const guilds = (await client.shard.fetchClientValues('guilds.size')).reduce((a, b) => a + b);
		const vcs = (await client.shard.fetchClientValues('voiceConnections.size')).reduce((a, b) => a + b);
		const users = (await client.shard.fetchClientValues('users.size')).reduce((a, b) => a + b);

		await msg.channel.send({
			embed: new Discord.RichEmbed()
				.setColor("#7d5bbe")
				.setTitle(`${client.user.username} - Stats (${config.version})`)
				.setDescription(`Uptime: ${timeCon(process.uptime())}`)
				.addField("Websocket Ping", `${(client.ping).toFixed(0)} ms`, true)
				.addField("CPU", percentageCPU + "% Usage", true)
				.addField("RAM Usage", `RSS: ${(process.memoryUsage().rss / 1048576).toFixed()}MB\nHeap: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB`, true)
				.addField("Total Servers", guilds, true)
				.addField("Total Users", users, true)
				.addField("Active VCs", vcs, true)
				

		})


	}, 100);




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
        return (parseInt(days) > 0 ? days + (days > 1 ? " days " : " day ") : "") + (parseInt(hours) === 0 && parseInt(days) === 0 ? "" : hours + (hours > 1 ? " hours " : " hour ")) + (parseInt(minutes) === 0 && parseInt(hours) === 0 && parseInt(days) === 0 ? "" : minutes + (minutes > 1 ? " minutes " : " minute ")) + seconds + (seconds > 1 ? " seconds " : " second ")
    }


