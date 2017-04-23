const superagent = require("superagent")

exports.run = async function (client, msg, args, config, Discord) {

	let lastCommit

	let res = await superagent
    .get("https://api.github.com/repos/Melmsie/Dank-Memer/commits")
    .set("User-Agent", "melmsie")
    .catch(err => {
        console.log("Couldn't get commit info")
    });

	if (res.body) lastCommit = `[${res.body[0].commit.message.slice(0, 20)}...](${res.body[0].commit.url})`

	msg.channel.sendEmbed(new Discord.RichEmbed()
		.setColor("#7d5bbe")
		.setTitle(`${client.user.username} - Stats (${config.version})`)
		.setDescription(`I've been awake for ${timeCon(process.uptime())}`)
		.addField("🏠 Guilds", client.guilds.size, true)
		.addField("👤 Users", client.users.size, true)
		.addField("📄 Text Channels", client.channels.filter(c => c.type === "text").size, true)
		.addField("🏓 Ping", `${(client.ping).toFixed(0)} ms`, true)
		.addField("🐏 RAM Usage", `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`, true)
		.addField("💾 Last Commit", lastCommit ? lastCommit : "Unknown", true)
	)

}

function timeCon(time) {
	let days = Math.floor((time % 31536000) / 86400)
	let hours = Math.floor(((time % 31536000) % 86400) / 3600)
	let minutes = Math.floor((((time % 31536000) % 86400) % 3600) / 60)
	let seconds = Math.round((((time % 31536000) % 86400) % 3600) % 60)
	days = days > 9  ? days : "0" + days
	hours = hours > 9 ? hours : "0" + hours
	minutes = minutes > 9 ? minutes : "0" + minutes
	seconds = seconds > 9 ? seconds : "0" + seconds
	return (parseInt(days) > 0 ? days + ":" : "") + (parseInt(hours) === 0 && parseInt(days) === 0 ? "" : hours + ":") + minutes + ":" + seconds
}
