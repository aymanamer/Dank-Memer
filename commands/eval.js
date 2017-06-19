const util = require("util")
exports.run = function (client, msg, args, config, Discord) {
	if (msg.author.id !== config.owner) return
	try {
		let before = Date.now()
		let rep = new RegExp(client.user.email + "|" + client.token, "gi");
		let code = eval(args.join(" "));
		if (typeof code === "string") code = code.replace(rep, "*");
		else code = util.inspect(code, {
			depth: 0
		}).replace(rep, "*");
		let evalTime = Date.now() - before
		msg.channel.send({
			embed: new Discord.RichEmbed()
				.setColor("#7d5bbe")
				.setFooter(`evaluated in ${evalTime}ms`)
				.addField("Input", `\`\`\`js\n${args.join(' ')}\`\`\``)
				.addField("Output", `\`\`\`js\n${code}\`\`\``)

		})
	} catch (e) {
		msg.channel.send({
			embed: new Discord.RichEmbed()
				.setColor("#7d5bbe")
				.addField("Input", `\`\`\`js\n${args.join(' ')}\`\`\``)
				.addField("Output", `\`\`\`js\n${e}\`\`\``)

		})
	}
}