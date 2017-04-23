exports.run = function (client, msg, args, config, Discord) {
    if (msg.author.id !== config.owner) return msg.reply(":thinking:")

	let embed = new Discord.RichEmbed()
	.setColor('#7d5bbe')
	.setTitle(client.user.username + " " + "Command Usage")
	.setDescription(`Total Command Usage: ${statsdb.total}`)
	.setFooter("Tip: You can view individual stats usage with 'usage <command>'")

	if (args[0] === "all") {

		msg.channel.sendMessage(`\`\`\`\n${Object.keys(statsdb).map(c => `${c}${pad(15, c)}${statsdb[c]} hits`).join("\n")}\n\`\`\``)

	} else if (args[0]) {
		if (!statsdb[args[0]]) return msg.reply(`Usage data for ${args[0]} not found`)
		msg.channel.sendEmbed(new Discord.RichEmbed()
			.setColor('#7d5bbe')
			.setTitle(client.user.username + " " + "Command Usage")
			.addField(args[0], statsdb[args[0]])
		)
	}

}

function pad(ln, str) {
    return Array(ln - str.length).join(" ")
}
