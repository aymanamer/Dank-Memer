const cowsay = require('cowsay')

exports.run = function (client, msg, args) {

	if (!args[0]) return msg.reply('You gotta give me something to say :eyes:')

	msg.channel.send(`\`\`\`\n${cowsay.say({ text: args.join(' '), e: 'oO', T: 'U ' })}\n\`\`\``).catch()
}