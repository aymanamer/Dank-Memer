const superagent = require("superagent")

exports.run = async function (client, msg, args, config, Discord) {

const guilds = await client.shard.fetchClientValues('guilds.size');
const count = guilds.reduce((prev, val) => prev + val, 0);
	
	msg.channel.send({embed: new Discord.RichEmbed()
		.setColor("#7d5bbe")
		.setTitle(`${client.user.username} - Stats (${config.version})`)
		.setDescription(`I've been awake for ${timeCon(process.uptime())}`)
		.addField("Guild Count", count, true)
		.addField("Websocket Ping", `${(client.ping).toFixed(0)} ms`, true)
		.addField("RAM Usage", `RSS: ${(process.memoryUsage().rss / 1048576).toFixed()}MB\nHeap: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB`, true)
		.addField("Shard Count", '2', true)
		.addField("Active VCs", client.voiceConnections.size, true)
		.addField("Libraries", `[Discord.js](https://discord.js.org) v${Discord.version}\nNode.js ${process.version}`, true)
		.addField('Links', '[Bot invite](https://discordapp.com/oauth2/authorize?client_id=270904126974590976&scope=bot&permissions=3073) | [Support server invite](https://discord.gg/Ek6MM5n)')
		
	})




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
