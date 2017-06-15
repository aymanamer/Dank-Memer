exports.run = function (client, msg, args, config) {

	var os = require("os");

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
	setTimeout(function () {

		//Grab second Measure
		var endMeasure = cpuAverage();

		//Calculate the difference in idle and total time between the measures
		var idleDifference = endMeasure.idle - startMeasure.idle;
		var totalDifference = endMeasure.total - startMeasure.total;

		//Calculate the average percentage CPU usage
		var percentageCPU = 100 - ~~(100 * idleDifference / totalDifference);
	
		//Output result to console
		let fine = percentageCPU + "% CPU Usage."

		msg.channel.send({
			embed: new Discord.RichEmbed()
				.setColor("#7d5bbe")
				.setTitle(`${client.user.username} - Advanced Stats (${config.version})`)
				.setDescription(`Uptime: ${timeCon(process.uptime())}`)
				.addField("Websocket Ping", `${(client.ping).toFixed(0)} ms`, true)
				.addField("CPU usage", fine, true)
				.addField("RAM Usage", `RSS: ${(process.memoryUsage().rss / 1048576).toFixed()}MB\nHeap: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB`, true)
				.addField("Shard", client.shard.id + '/' + client.shard.count, true)
				.addField("Active VCs", client.voiceConnections.size, true)
				

		})

	}, 100);


}