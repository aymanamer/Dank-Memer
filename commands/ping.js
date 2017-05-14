exports.run = function (client, msg) {
	msg.channel.send(`:ping_pong: ${(client.ping).toFixed(0)} ms`)
}
