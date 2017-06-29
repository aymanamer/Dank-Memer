const {
	exec
} = require('child_process')
const util = require("util")
exports.run = async function (client, msg, args, config, Discord) {
	if (!config.devs.includes(msg.author.id)) return


	if (args[0] === ('help') || args.length < 1) {
		await msg.channel.send('__Commands:__\neval `<args>`\nbash `<args>`\ngit `[pull]/[push]`\nreboot `[all]/[shard]`')
	} else if (args[0] === ('reboot')) {
		if (args[1] === ('shard')) {
			await msg.channel.send('Current shard rebooting...')
			return process.exit()
		} else if (args[1] === ('all')) {
			await msg.channel.send('All shards rebooting...')
			exec('pm2 restart shard', (e, stderr, stdout) => {
				if (stdout) msg.channel.send(`**Output**\n\`\`\`bash\n${stdout}\n\`\`\``)
				if (stderr) msg.channel.send(`**Errors**\n\`\`\`bash\n${stderr}\n\`\`\``)
			})
		} else {
			return await msg.channel.send('Huh?')
		}
	} else if (args[0] === ('eval')) {
		let res
		let evalTime
		try {
			let before = Date.now()
			let rep = new RegExp(client.user.email + '|' + client.token, 'gi')
			res = eval(args.join(' ').slice(5))
			if (typeof res === 'string') res = res.replace(rep, '*')
			else res = util.inspect(res, {
				depth: 0
			}).replace(rep, '*')
			evalTime = Date.now() - before
		} catch (err) {
			res = err
		}
		await msg.channel.send({
			embed: new Discord.RichEmbed()
				.setColor('#7d5bbe')
				.addField('Input', `\`\`\`js\n${args.join(' ').slice(5)}\`\`\``)
				.addField('Output', `\`\`\`js\n${res}\`\`\``)
				.setFooter(`evaluated in ${evalTime}ms`)
		})
	} else if (args[0] === ('bash')) {
		await msg.channel.send(`**Input**\n\`\`\`sh\n$ ${args.join(' ').slice(5)}\n\`\`\``)
		exec(args.join(' ').slice(5), (e, stderr, stdout) => {
			if (stdout) msg.channel.send(`**Output**\n\`\`\`bash\n${stdout}\n\`\`\``)
			if (stderr) msg.channel.send(`**Errors**\n\`\`\`bash\n${stderr}\n\`\`\``)
		})
	}


}