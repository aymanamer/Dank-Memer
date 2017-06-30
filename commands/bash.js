const { exec } = require('child_process')

exports.run = function (client, msg, args, config) {
	if (msg.author.id !== config.owner)
		return msg.reply(':x::weary::raised_back_of_hand:\n*This is a terminal command executer, not a baseball bat!*')

	msg.delete()
	msg.channel.send(`**Input**\n\`\`\`sh\n$ ${args.join(' ')}\n\`\`\``)
	exec(args.join(' '), (e, stderr, stdout) => {
		if (stdout) msg.channel.send(`**Output**\n\`\`\`bash\n${stdout}\n\`\`\``)
		if (stderr) msg.channel.send(`**Errors**\n\`\`\`bash\n${stderr}\n\`\`\``)
	})
}
