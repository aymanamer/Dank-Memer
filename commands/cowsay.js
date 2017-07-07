const cowsay = require('cowsay')

exports.run = function (client, msg, args) {
	msg.channel.send(`\`\`\`\n${cowsay.say({ text: args.join(' '), e: 'oO', T: 'U ' })}\n\`\`\``).catch()
}