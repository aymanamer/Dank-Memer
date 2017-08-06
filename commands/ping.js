exports.run = function (Memer, msg) {
	msg.channel.createMessage(`${msg.channel.guild.shard.latency}ms`)
}