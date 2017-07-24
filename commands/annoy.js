const serverStaff = ['221060582986612749', '145456746721312768', '210579245607550977', '162134224353230848', '291422304544620544', '261295304337391616']


function send(target, text) {
	return target.send(text)
}

function repeat(times, delay, target, text) {
	return new Promise((resolve, reject) => {
		let interval
		let count = 0

		interval = setInterval(() => {
			count++
			if (count >= times) {
				clearInterval(interval)
				resolve(true)
			}
			send(target, text).catch((e) => {
				clearInterval(interval)
				reject(e)
			})
		}, delay * 1000)
	})
}

function setupAnnoy(repetitions, delay) {
	return async function (target, announcement, annoyance) {
		await send(target, announcement)
		await repeat(repetitions, delay, target, annoyance)
	}
}

exports.run = async function (client, msg, args, config) {
	const annoy = setupAnnoy(config.annoy.repetitions, config.annoy.delay)
	const author = msg.author

	try {
		if (!msg.channel.permissionsFor(client.user.id).has('ADD_REACTIONS')) {
			await send(author, 'Well shit, there was a permission error! Make sure I have `add reactions` so I can do this shit!')
			return false
		}
		else {
			await msg.react('🙄')
		}

		if (msg.mentions.users.size === 0) {
			await annoy(
				author,
				'Now I get to annoy you by sending you a message every 30 seconds for 5 minutes! Next time, you should really tag someone else to annoy!',
				'Haha, you annoyed yourself!'
			)
		}
		else if (serverStaff.includes(msg.mentions.users.first().id)) {
			await annoy(
				author,
				`${msg.mentions.users.first().username} is a staff member on my server, so I'm not gonna let you annoy them. Nice try though!`,
				'Haha, you suck!'
			)
		}
		else if (config.owner === msg.mentions.users.first().id) {
			await annoy(
				author,
				'Really, you were going to try and annoy Melmsie? As if he wouldn\'t put something in place to prevent that? HA!',
				'Haha, you suck!'
			)
		}
		else {
			const user = msg.mentions.users.first()
			try {
				await annoy(
					user,
					`I've been sent by ${author.username} to annoy you. :^)\n\nSee you every 30 seconds for the next 5 minutes )`,
					`I've been sent by ${author.username} to annoy you. :^)`
				)
			}
			catch (e) {
				console.log('When trying to annoy a user: ' + e.message)
				await annoy(
					author,
					`You sent me to annoy ${user.username}, but I don't have permission to DM them! Get counter annoyed every 30 seconds for the next 5 minutes, fool!`,
					`It's been 30 seconds! You sent me to annoy ${user.username}, but I don't have permission to DM them! Get counter annoyed, fool!!!!`
				)
			}
		}
	}
	catch (e) {
		console.error(e)
		return false
	}
	return true
}