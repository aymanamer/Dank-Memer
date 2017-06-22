exports.run = async function (client, msg) {

	msg.channel.send(`Uptime: ${uptime(process.uptime())} seconds`)
		
}
function uptime(time) {
	let seconds = Math.round((((time % 31536000) % 86400) % 3600) % 60)
	return seconds;
}