const serverStaff = ['221060582986612749', '145456746721312768', '210579245607550977', '162134224353230848', '291422304544620544', '261295304337391616']
exports.run = function (client, msg) {
	msg.react('🙄')
	if (serverStaff.includes(msg.mentions.users.first().id)) {
		msg.author.send(`${msg.mentions.users.first().username} is a staff member on my server, so I'm not gonna let you annoy them. Nice try though!`).catch(e => { // eslint-disable-line no-unused-vars
			return clearInterval(haha)
		})
		const intervalFunc = () => {
			msg.author.send('Haha, you suck!').catch(e => { // eslint-disable-line no-unused-vars
				return clearInterval(haha)
			})
		}
		const haha = setInterval(intervalFunc, 30000)
	} else if (msg.mentions.users.size === 0) {
		msg.author.send('Now I get to annoy you by sending you a message every 30 seconds for 5 minutes! Next time, you should really tag someone else to annoy!').catch()
		const intervalFunc = () => {
			msg.author.send('Haha, you annoyed yourself!').catch()
		}

		const haha = setInterval(intervalFunc, 30000)

		setTimeout(function () { // eslint-disable-line prefer-arrow-callback
			clearInterval(haha)
		}, 300000)
	} else {
		const user = msg.mentions.users.first()

		user.send(`I\'ve been sent by ${msg.author.username} to annoy you. :^)\n\nSee you every 30 seconds for the next 5 minutes ;)`).catch(e => { // eslint-disable-line no-unused-vars
			msg.author.send(`You sent me to annoy ${user.username}, but I don\'t have permission to DM them! Get counter annoyed every 30 seconds for the next 5 minutes, fool!`).catch(e => { // eslint-disable-line no-unused-vars
				return clearInterval(haha)
			})
		})

		const intervalFunc = () => {
			user.send(`I've been sent by ${msg.author.username} to annoy you. :^)`).catch(e => { // eslint-disable-line no-unused-vars
				msg.author.send(`It's been 30 seconds! You sent me to annoy ${user.username}, but I don\'t have permission to DM them! Get counter annoyed, fool!!!!`).catch(e => { // eslint-disable-line no-unused-vars
					return clearInterval(haha)
				})
			})
		}

		const haha = setInterval(intervalFunc, 30000)

		setTimeout(function () { // eslint-disable-line prefer-arrow-callback
			clearInterval(haha)
		}, 300000)
	}
}