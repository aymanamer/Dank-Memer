const {
	exec
} = require('child_process')
const util = require('util')
const snakefetch = require('snekfetch')
const twit = require('twit')
const fs = require('fs')
exports.run = async function (client, msg, args, config, Discord) {
	if (!config.devs.includes(msg.author.id)) return

	const command = args[0].toLowerCase()

	args.shift()

	if (command === 'help' || !args[0])
		msg.channel.send({
			embed: new Discord.RichEmbed()
				.setColor('#3676b3')
				.setDescription('Hello, I\'m not sure how tf you forgot these commands since you partially made them all, but here you go.')
				.addField('reboot', 'reboot [shard, all]')
				.addField('eval', 'eval <args>')
				.addField('bash', 'bash <args>')
				.addField('git', 'git pull')
				.addField('donor', '[add, remove] [1, 5, 10] <id or @tag>')
				.addField('blacklist', '[add, remove] [guild, user, channel] <id or @tag>')
				.setDescription('Now go fuck people up with these OP commands!')
		})

	if (command === 'reboot')
		if (args[0] === 'shard') {
			await msg.channel.send('Current shard rebooting...')
			return process.exit()
		} else if (args[0] === 'all') {
		await msg.channel.send('All shards rebooting...')
		exec('pm2 restart shard', (e, stderr, stdout) => {
			if (stdout) msg.channel.send(`**Output**\n\`\`\`bash\n${stdout}\n\`\`\``)
			if (stderr) msg.channel.send(`**Errors**\n\`\`\`bash\n${stderr}\n\`\`\``)
		})
	} else {
		return msg.channel.send('Huh?')
	}

	if (command === 'eval') {
		let res
		let evalTime
		try {
			const rep = new RegExp(client.token, 'gi')
			const before = Date.now()
			res = eval(args.join(' '))
			evalTime = Date.now() - before
			if (typeof res === 'string')
				res = res.replace(rep, '*')
			else res = util.inspect(res, {
					depth: 0
				})
				.replace(rep, '*')
		} catch (err) {
			res = err
		}
		msg.channel.send({
			embed: new Discord.RichEmbed()
				.setColor('#7d5bbe')
				.addField('Input', `\`\`\`js\n${args.join(' ')}\`\`\``)
				.addField('Output', `\`\`\`js\n${res}\`\`\``)
				.setFooter(evalTime || evalTime === 0 ? `evaluated in ${evalTime}ms` : '')
		})
	}

	if (command === 'bash') {
		await msg.channel.send(`**Input**\n\`\`\`sh\n$ ${args.join(' ')}\n\`\`\``)
		exec(args.join(' '), async(e, stderr, stdout) => {
			if (stdout.length + stderr.length > 2000) {
				const res = await snakefetch.post('https://hastebin.com/documents')
					.send(`${stdout}\n\n${stderr}`)
					.catch(err => msg.channel.send(err.message))
				msg.channel.send(`Console log exceeds 2000 characters. View here: https://hastebin.com/${res.body.key}.`)
			} else {
				if (stdout) msg.channel.send(`**Output**\n\`\`\`bash\n${stdout}\n\`\`\``)
				if (stderr) msg.channel.send(`**Errors**\n\`\`\`bash\n${stderr}\n\`\`\``)
				if (!stderr && !stdout)
					msg.react('\u2611')
			}
		})
	}

	if (command === 'git')
		if (args[0] === 'pull') {
			await msg.channel.send('Pulling out...')
			exec('git pull', (e, stderr, stdout) => {
				if (stdout || stderr)
					msg.channel.send(`**Output**\n\`\`\`bash\n${stdout}\n\n${stderr}\`\`\``)
			})
		} else {
			msg.channel.send('As of right now, only `git pull` is available.')
		}

	if (command === 'donor') {
		if (!args[0] || !args[1] || !['add', 'remove'].includes(args[0].toLowerCase()) || !['1', '5', '10'].includes(args[1]))
			return msg.channel.send('Argument error. The first argument must be one of `add` or `remove`, and the second must be one of `1`, `5` or `10`.')

		if (args[0].toLowerCase() === 'add') {
			await client.shard.broadcastEval(`this.ids.donors['donor${args[1]}'] = this.ids.donors['donor${args[1]}'].concat(${msg.mentions.users.size ? msg.mentions.users.map(u => `'${u.id}'`) : args.slice(2).filter(arg => parseInt(arg)).map(u => `'${u}'`)})`)
			writeFile(msg, 0, args, client.ids)
		} else if (args[0].toLowerCase() === 'remove') {
			if (args[3])
				msg.channel.send('You can\'t remove multiple people from donor status (yet). The command is going to ignore all member args except the first.')
			if (client.ids.donors[`donor${args[1]}`].indexOf(msg.mentions.users.size ? msg.mentions.users.first().id : args[2]) === -1)
				return msg.channel.send(`\`${args[2]}\` not found in the donor${args[1]}.`)

			if (msg.mentions.users.size)
				args[2] = msg.mentions.users.first().id
			else if (!parseInt(args[2]))
				return msg.channel.send('The third arg must either be a mention or an ID.')
			const index = client.ids.donors[`donor${args[1]}`].indexOf(args[2])
			await client.shard.broadcastEval(`this.ids.donors['donor${args[1]}'].splice(${index}, 1)`)
			writeFile(msg, 1, args, client.ids)
		}
	}

	if (command === 'blacklist') {
		if (!args[0] || !args[1] || !args[2] ||
			!['add', 'remove'].includes(args[0].toLowerCase()) ||
			!['channel', 'user', 'guild'].includes(args[1].toLowerCase()))
			return msg.channel.send('Argument error. Make sure your first argument is one of `add` or `remove`, your second `channel`, `guild` or `user` and your third an ID or a mention (users only; use ID\'s for channels and guilds).')

		if (args[0].toLowerCase() === 'add') {
			if (args[1].toLowerCase() === 'user')
				await client.shard.broadcastEval(`this.ids.blocked['user'] = this.ids.blocked['user'].concat(${msg.mentions.users.size ? msg.mentions.users.map(u => `'${u.id}'`) : args.slice(2).filter(arg => parseInt(arg)).map(u => `'${u}'`)})`)
			if (args[1].toLowerCase() === 'channel')
				await client.shard.broadcastEval(`this.ids.blocked['channel'] = this.ids.blocked['channel'].concat(${args.slice(2).filter(arg => parseInt(arg)).map(c => `'${c}'`)})`)

			if (args[1].toLowerCase() === 'guild' || args[1].toLowerCase() === 'server')
				await client.shard.broadcastEval(`this.ids.blocked['guild'] = this.ids.blocked['guild'].concat(${args.slice(2).filter(arg => parseInt(arg)).map(g => `'${g}'`)})`)
			writeFile(msg, 2, args, client.ids)
		} else if (args[0].toLowerCase() === 'remove') {
			if (args[3])
				msg.channel.send('You can\'t unblacklist multiple items (yet). The command is going to ignore all args except the first.')
			if (client.ids.blocked[args[1]].indexOf(msg.mentions.users.size ? msg.mentions.users.first().id : args[2]) === -1)
				return msg.channel.send(`\`${args[2]}\` not found in blocked database. Please block to unblock. :^)`)
			if (msg.mentions.users.size)
				args[2] = msg.mentions.users.first().id
			else if (!parseInt(args[2]))
				return msg.channel.send('The third arg must either be a mention or an ID, or in the case of channels and guilds, just an ID.')
			const index = client.ids.blocked[args[1]].indexOf(args[2])
			await client.shard.broadcastEval(`this.ids.blocked['${args[1]}'].splice(${index}, 1)`)
			writeFile(msg, 3, args, client.ids)
		}
	}

	if (command === 'deletetweet') {
		const tClient = new twit({
			consumer_key: 'Gkan9QvKDjZgWnJajCPMZ8jxL',
			consumer_secret: '5x3EkR48doQGXxlrEG2LLvWvemE9We20TlW6dgabC7zRUiScxS',
			access_token: '878224959151247361-0sxlyNs1WxVNcsZQmrspT3sWjUnPd1x',
			access_token_secret: 'nlZbvOYEnlN4vqlcB1Ips5c2qT9suL1KXPRDyDZxaPpsL',
			timeout_ms: 60 * 1000,
		})
		if (!parseInt(args[0]))
			return msg.channel.send('Argument error. Make sure the argument(s) you\'re passing are numbers and exist.')
		args.filter(arg => parseInt(arg)).forEach(targetTweetID => {
			tClient.post('statuses/destroy/:id', {
				id: targetTweetID
			}, (err, data, response) => {
				if (!err && response.statusCode === 200)
					msg.channel.send({
						embed: new Discord.RichEmbed()
							.setColor('#4099FF')
							.setDescription(`Tweet ${targetTweetID} successfully deleted.`)
					})
				else
					msg.channel.send(`Something went wrong.\nStatus code: ${response.statusCode}\nError: ${err.message}`)
			})
		})
	}


}

function writeFile(msg, choice, args, ids) {
	let successMessage
	switch (choice) {
		case 0:
			successMessage = `${msg.mentions.users.size ? msg.mentions.users.map(u => u.username).join(', ') : args.slice(2).filter(arg => parseInt(arg)).join(', ')} added to donor${args[1]}.`
			break
		case 1:
			successMessage = `${msg.mentions.users.size ? msg.mentions.users.first().username : args[2]} removed from donor${args[1]}.`
			break
		case 2:
			successMessage = `${msg.mentions.users.size ? msg.mentions.users.map(u => u.username).join(', ') : args.slice(2).filter(arg => parseInt(arg)).join(', ')} blocked.`
			break
		case 3:
			successMessage = `${args[2]} unblocked.`
	}
	fs.writeFile('./ids.json', JSON.stringify(ids, '', '\t'), (err) => {
		if (err)
			return msg.channel.send(`Well fuck. ${err.message}`)
		else
			return msg.channel.send(successMessage)
	})
}