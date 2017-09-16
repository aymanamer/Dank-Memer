exports.run = function (Memer, msg) {
	msg.channel.createMessage(`${msg.channel.guild.shard.latency}ms`)
}

exports.props = {
	name        : 'ping',
	usage       : '{command}',
	aliases     : ['pong'],
	cooldown    : 1000,
	description : 'hi'
}