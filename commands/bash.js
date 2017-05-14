const { exec } = require("child_process")

exports.run = function (client, msg, args, config, Discord) {
    if (msg.author.id !== config.owner) return msg.reply(":x::weary::raised_back_of_hand:\n*This is a terminal command executer, not a baseball bat!*")

	msg.delete()
    try {
        msg.channel.send(`**Input**\n\`\`\`sh\n$ ${args.join(" ")}\n\`\`\``)
        exec(`${args.join(" ")}`, (stderr, stdout) => {
            if (stdout) msg.channel.send(`**Output**\n\`\`\`bash\n${stdout}\n\`\`\``);
            if (stderr) msg.channel.send(`**Errors**\n\`\`\`bash\n${stderr}\n\`\`\``);
        })
    } catch (e) {
        msg.channel.send(`**Error!**\n\`\`\`js\n${e}\n\`\`\``)
        console.log(new Date() + ": " + e.message)
    }
}
