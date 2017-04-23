exports.run = function (client, msg) {
	msg.channel.sendMessage(`:ping_pong: ${(client.ping).toFixed(0)} ms`)
}
