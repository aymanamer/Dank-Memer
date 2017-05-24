exports.run = function (client, msg) {
	msg.channel.send(`:ping_pong: ${(client.ping).toFixed(2)} ms`)
}
