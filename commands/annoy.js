exports.run = function (client, msg) {
	if (msg.mentions.users.size === 0) {
		msg.author.send('Now I get to annoy you by sending you a message every 30 seconds for 5 minutes! Next time, you should really tag someone else to annoy!').catch()
		function intervalFunc () {
			msg.author.send('Haha, you annoyed yourself!').catch()
		}

		const haha = setInterval(intervalFunc, 30000)

		setTimeout(function () {
			clearInterval(haha)
		}, 300000)
	} else {
		const user = msg.mentions.users.first()

		user.send(`I\'ve been sent by ${msg.author.username} to annoy you. :^)\n\nSee you every 30 seconds for the next 5 minutes ;)`).catch(
			msg.author.send(`You sent me to annoy ${user.username}, but I don\'t have permission to DM them! Get counter annoyed every 30 seconds for the next 5 minutes, fool!`).catch()
		)

		function intervalFunc() {
			user.send(`I've been sent by ${msg.author.username} to annoy you. :^)`).catch(
				msg.author.send(`It's been 30 seconds! You sent me to annoy ${user.username}, but I don\'t have permission to DM them! Get counter annoyed, fool!!!!`).catch()
			)
		}

		const haha = setInterval(intervalFunc, 30000)

		setTimeout(function () {
			clearInterval(haha)
		}, 300000)
	}
}