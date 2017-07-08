const rating = Math.floor(Math.random() * 10 + 1)


exports.run = function (client, msg) {
	msg.channel.send(`I rate you a ${rating}/10 on the dank scale.`)
}
