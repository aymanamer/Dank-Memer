const { exec } = require('child_process')
const util = require('util')
const twit = require('twit')
const fs = require('fs')
//const table = require('table')
const twitter = require('../config.json').twitter
const tClient = new twit({
	consumer_key: twitter.consumer_key,
	consumer_secret: twitter.consumer_secret,
	access_token: twitter.access_token,
	access_token_secret: twitter.access_token_secret,
	timeout_ms: 60 * 1000,
})

/*const config = { // eslint-disable-line no-unused-vars
	border: {
		topBody: '─',
		topJoin: '┬',
		topLeft: '┌',
		topRight: '┐',
		bottomBody: '─',
		bottomJoin: '┴',
		bottomLeft: '└',
		bottomRight: '┘',
		bodyLeft: '│',
		bodyRight: '│',
		bodyJoin: '│',
		joinBody: '─',
		joinLeft: '├',
		joinRight: '┤',
		joinJoin: '┼'
	}
}*/

exports.run = async function (Memer, msg, args) {
	if (args[0] === 'help' || !args[0]) {
		return msg.channel.createMessage({ embed: {
			footer: { text: 'Now go fuck people up with these OP commands!' },
			color: 3569331,
			fields: [
				{ name: 'reboot', 	 value: 'reboot [shard, all]' },
				{ name: 'eval', 	 value: 'eval <args>' },
				{ name: 'bash', 	 value: 'bash <args>' },
				{ name: 'git', 		 value: 'git pull' },
				{ name: 'donor', 	 value: '[add, remove] [1, 5, 10] <id or @tag>' },
				{ name: 'blacklist', value: '[add, remove] [guild, user, channel] <id or @tag>' }
			]
		}})
	}

	const command = args[0]
	args.shift()

	if (command === 'deletetweet' && msg.member.roles.includes('339186850910699520')) {
		if (!parseInt(args[0])) {
			return msg.channel.createMessage('Argument error. Make sure the argument(s) you\'re passing are numbers and exist.')
		}
		args.filter(arg => parseInt(arg)).forEach(targetTweetID => {
			tClient.post('statuses/destroy/:id', { id: targetTweetID }, (err, data, response) => {
				if (!err && response.statusCode === 200) {
					msg.channel.createMessage({ embed: {
						color: 0x4099FF,
						description: `Tweet ${targetTweetID} successfully deleted.`
					}})
				} else {
					msg.channel.createMessage(`Something went wrong.\nStatus code: ${response.statusCode}\nError: ${err.message}`)
				}
			})
		})
	}

	if (!Memer.config.devs.includes(msg.author.id)) { return }

	if (command === 'reboot') {
		await msg.channel.send('All shards rebooting...')
		return process.exit()
	}

	/*if (command === 'shardinfo') { // Fuck this for now
		const data = [
			[
				'Shard #',
				'Guilds',
				'Users',
				'VCs',
				'Ping',
				'Memory Usage'
			]
		]
		const res = await client.shard.broadcastEval('[(this.shard.id + 1), this.guilds.size, this.users.size, this.voiceConnections.size, Math.round(this.ping), (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(1)]')
		res.map(v => {
			const newdata = v
			newdata[4] = `${v[4]} ms`
			newdata[5] = `${v[5]} MB`
			data.push(newdata)
		})
		data.push([
			'Total',
			res.map(v => v[1]).reduce((a, b) => a + b, 0),
			res.map(v => v[2]).reduce((a, b) => a + b, 0),
			res.map(v => v[3]).reduce((a, b) => a + b, 0),
			`${Math.round(res.map(v => Number(v[4].match(/(\d+[\.]+\d+|\d+)/)[0])).reduce((a, b) => a + b, 0) / client.shard.count)} ms`, // eslint-disable-line prefer-template
			`${res.map(v => Number(v[5].match(/(\d+[\.]+\d+|\d+)/)[0])).reduce((a, b) => a + b, 0)} MB`
		])

		msg.channel.send(table.table(data, config), { code: 'js' })
	}*/


	if (command === 'eval') {
		let res
		let evalTime
		try {
			const rep = new RegExp(Memer.client.token, 'gi')
			const before = Date.now()
			res = eval(args.join(' '))
			evalTime = Date.now() - before
			if (typeof res === 'string') {
				res = res.replace(rep, '*')
			} else {
				res = util.inspect(res, { depth: 0 })
					.replace(rep, '*')
			}
		} catch (err) {
			res = err
		}
		msg.channel.createMessage({ embed: {
			color: Memer.colors.lightblue,
			fields: [
				{ name: 'Input', value: Memer.codeblock(args.join(' '), 'js') }, // eslint-disable-line prefer-template
				{ name: 'Output', value: Memer.codeblock(res, 'js')  } // eslint-disable-line prefer-template
			],
			footer: { text: evalTime || evalTime === 0 ? `evaluated in ${evalTime}ms` : '' }
		}})
	}

	if (command === 'bash') {
		msg.channel.send(`**Input**\n${Memer.codeblock(args.join(' '), 'sh')}`)
		exec(args.join(' '), async (e, stdout, stderr) => {
			if (stdout.length + stderr.length > 2000) {
				const res = await Memer.snekfetch.post('https://hastebin.com/documents')
					.send(`${stdout}\n\n${stderr}`)
					.catch(err => msg.channel.send(err.message))
				msg.channel.send(`Console log exceeds 2000 characters. View here: https://hastebin.com/${res.body.key}.`)
			} else {
				if (stdout) {
					msg.channel.send(`**Output**\n${Memer.codeblock(stdout, 'bash')}`)
				}
				if (stderr) {
					msg.channel.send(`**Errors**\n${Memer.codeblock(stdout, 'bash')}`)
				}
				if (!stderr && !stdout) {
					msg.react('\u2611')
				}
			}
		})
	}

	if (command === 'git') {
		if (args[0] === 'pull') {
			await msg.channel.send('Pulling out...')
			exec('git pull', (e, stderr, stdout) => {
				if (stdout || stderr) {
					msg.channel.send(`**Output**\n${Memer.codeblock(`${stdout}\n\n${stderr}`, 'bash')}`)
				}
			})
		} else {
			msg.channel.send('As of right now, only `git pull` is available.')
		}
	}

	if (command === 'donor') {
		if (!args[0] || !args[1] || !['add', 'remove'].includes(args[0]) || !['1', '5', '10'].includes(args[1])) {
			return msg.channel.createMessage('Argument error. The first argument must be one of `add` or `remove`, and the second must be one of `1`, `5` or `10`.')
		}

		if (args[0] === 'add') {
			Memer.ids.donors[`donor${args[1]}`] = Memer.ids.donors[`donor${args[1]}`].concat(msg.mentions[0] ? msg.mentions.map(u => u.id) : args.slice(2).filter(arg => parseInt(arg)))
			writeFile(msg, 0, args, Memer.ids)
		} else if (args[0] === 'remove') {
			if (args[3]) {
				msg.channel.createMessage('You can\'t remove multiple people from donor status (yet). The command is going to ignore all member args except the first.')
			}
			if (Memer.ids.donors[`donor${args[1]}`].indexOf(msg.mentions[0] ? msg.mentions[0].id : args[2]) === -1) {
				return msg.channel.createMessage(`\`${args[2]}\` not found in donor${args[1]}.`)
			}
			if (msg.mentions[0]) {
				args[2] = msg.mentions[0].id
			}
			else if (!parseInt(args[2])) {
				return msg.channel.createMessage('The third arg must either be a mention or an ID.')
			}
			const index = Memer.ids.donors[`donor${args[1]}`].indexOf(args[2])
			Memer.ids.donors[`donor${args[1]}`].splice(index, 1)
			writeFile(msg, 1, args, Memer.ids)
		}
	}

	if (command === 'blacklist') {
		if (!args[0] || !args[1] || !args[2] ||
			!['add', 'remove'].includes(args[0].toLowerCase()) ||
			!['channel', 'user', 'guild'].includes(args[1].toLowerCase())) {
			return msg.channel.createMessage('Argument error. Make sure your first argument is one of `add` or `remove`, your second `channel`, `guild` or `user` and your third an ID or a mention (users only use ID\'s for channels and guilds).')
		}

		if (args[0].toLowerCase() === 'add') {
			if (args[1].toLowerCase() === 'user') {
				Memer.ids.blocked.user = Memer.ids.blocked.user.concat(msg.mentions[0] ? msg.mentions.map(u => u.id) : args.slice(2).filter(arg => parseInt(arg)))
			}
			if (args[1].toLowerCase() === 'channel') {
				Memer.ids.blocked.channel = Memer.ids.blocked.channel.concat(args.slice(2).filter(arg => parseInt(arg)))
			}

			if (args[1].toLowerCase() === 'guild' || args[1].toLowerCase() === 'server') {
				Memer.ids.blocked.guild = Memer.ids.blocked.guild.concat(args.slice(2).filter(arg => parseInt(arg)))
			}
			writeFile(msg, 2, args, Memer.ids)
		} else if (args[0].toLowerCase() === 'remove') {
			if (args[3]) {
				msg.channel.createMessage('You can\'t unblacklist multiple items (yet). The command is going to ignore all args except the first.')
			}
			if (Memer.ids.blocked[args[1]].indexOf(msg.mentions[0] ? msg.mentions[0].id : args[2]) === -1) {
				return msg.channel.createMessage(`\`${args[2]}\` not found in blocked database. Please block to unblock. :^)`)
			}
			if (msg.mentions[0]) {
				args[2] = msg.mentions[0].id
			}
			else if (!parseInt(args[2])) {
				return msg.channel.createMessage('The third arg must either be a mention or an ID, or in the case of channels and guilds, just an ID.')
			}
			const index = Memer.ids.blocked[args[1]].indexOf(args[2])
			Memer.ids.blocked[`${args[1]}`].splice(index, 1)
			writeFile(msg, 3, args, Memer.ids)
		}
	}
}

function writeFile(msg, choice, args, ids) {
	let successMessage
	switch (choice) {
	case 0:
		successMessage = `${msg.mentions[0] ? msg.mentions.map(u => u.username).join(', ') : args.slice(2).filter(arg => parseInt(arg)).join(', ')} added to donor${args[1]}.`
		break
	case 1:
		successMessage = `${msg.mentions[0] ? msg.mentions[0].username : args[2]} removed from donor${args[1]}.`
		break
	case 2:
		successMessage = `${msg.mentions[0] ? msg.mentions.map(u => u.username).join(', ') : args.slice(2).filter(arg => parseInt(arg)).join(', ')} blocked.`
		break
	case 3:
		successMessage = `${args[2]} unblocked.`
	}
	fs.writeFile('./ids.json', JSON.stringify(ids, '', '\t'), (err) => {
		if (err) {
			return msg.channel.createMessage(`Well fuck. ${err.message}`)
		}
		else {
			return msg.channel.createMessage(successMessage)
		}
	})
}