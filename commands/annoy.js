/*
const serverStaff = ['221060582986612749', '290638758867370006', '261525727067766784']

function send(target, text) {
	return target.send(text)
}

function repeat(times, delay, target, text) {
	return new Promise((resolve, reject) => {
		let count = 0
		const interval = setInterval(() => {
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
*/
exports.run = async function (client, msg, args, utils, config) {
	/*
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
			msg.channel.send('Who do you want to annoy? Reply with a mention or cancel by sending anything else.')
			const collector = msg.channel.createMessageCollector(m => msg.author.id === m.author.id, { time: 40000 })
			collector.on('collect', async (m) => {
				if (m.mentions.users.size) {
					collector.stop()
					const user = m.mentions.users.first()
					try {
						await annoy(
							user,
							`I've been sent by ${author.username} to annoy you. :^) Prepare to hear from me every 2 seconds for a while!`,
							`You can thank ${author.username} for this :^)`
						)
					}
					catch (e) {
						console.log(`When trying to annoy a user: ${e.message}`)
						await annoy(
							author,
							`You sent me to annoy ${user.username}, but I don't have permission to DM them! Get counter annoyed, fool!`,
							'lol!'
						)
					}
				} else {
					msg.channel.send('Now I get to annoy you by sending you a message every 2 seconds for a while! Next time, you should really tag someone else to annoy when prompted!')
					collector.stop()
					await annoy(
						author,
						'Now I get to annoy you by sending you a message every 2 seconds for a while! Next time, you should really tag someone else to annoy when prompted!',
						'Haha, you annoyed yourself!'
					)
				}
			})
		}
		else if (serverStaff.includes(msg.mentions.users.first().id)) {
			await annoy(
				author,
				`${msg.mentions.users.first().username} is a staff member on my server, so I'm not gonna let you annoy them. Nice try though!`,
				'Do not fuck with muh squad'
			)
		}
		else if (config.owner === msg.mentions.users.first().id) {
			await annoy(
				author,
				'Really, you were going to try and annoy Melmsie? As if he wouldn\'t put something in place to prevent that? HA!',
				'Haha, you suck!!!'
			)
		}
		else {
			const user = msg.mentions.users.first()
			try {
				await annoy(
					user,
					`I've been sent by ${author.username} to annoy you. :^) Prepare to hear from me every 2 seconds for a while!)`,
					`You can thank ${author.username} for this :^)`
				)
			}
			catch (e) {
				console.log(`When trying to annoy a user: ${e.message}`)
				await annoy(
					author,
					`You sent me to annoy ${user.username}, but I don't have permission to DM them! Get counter annoyed, fool!`,
					'lol!'
				)
			}
		}
	}
	catch (e) {
		console.error(e)
		return false
	}
	*/
	msg.reply('This command is being removed due to the HUGE mass of complaints. \nIf you would like a bot to annoy you, this bot (http://i.imgur.com/e7BlWYC.png) will be coming after the next major Dank Memer update!\nRight now it is being developed, but if you add it early with this link, (<https://goo.gl/bQ6FQ4>), you can be among the first to start annoying people again!!!')
}