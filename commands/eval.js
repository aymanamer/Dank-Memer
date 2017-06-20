exports.run = function (client, msg, args) {
	if (msg.author.id !== config.owner) return
	let res
	try {
		let before = Date.now()
		let rep = new RegExp(client.user.email + '|' + client.token, 'gi')
		res = eval(args.join(' '))
		if (typeof res === 'string') res = res.replace(rep, '*')
		else res = util.inspect(res, { depth: 0 }).replace(rep, '*')
		let evalTime = Date.now() - before
	} catch (err) {
		res = err
	}
	msg.channel.send({
		embed: new Discord.RichEmbed()
			.setColor('#7d5bbe')
			.addField('Input', `\`\`\`js\n${args.join(' ')}\`\`\``)
			.addField('Output', `\`\`\`js\n${res}\`\`\``)
			.setFooter(`evaluated in ${evalTime}ms`)
	})
}
