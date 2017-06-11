exports.run = function (client, msg, args, config, Discord) {

	let user = msg.mentions.users.first()
	let member = msg.guild.member(user)

	if (msg.mentions.users.size === 0) {
		return msg.channel.send("You must mention a user to annoy!")
	}


	user.send('I\'ve been sent by ' + msg.author.username + ' to annoy you. :^)\n\nSee you every 30 seconds for the next 5 minutes ;)').catch(console.error)

	function intervalFunc() {
		user.send('I\'ve been sent by ' + msg.author.username + ' to annoy you. :^)').catch(console.error)
	}

	let haha = setInterval(intervalFunc, 30000)

	setTimeout(function () {
		clearInterval(haha)
	}, 300000)

}