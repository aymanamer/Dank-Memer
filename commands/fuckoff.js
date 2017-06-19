const snekfetch = require('snekfetch')
exports.run = function (client, msg, args, config) {

	if (args.length < 1) return msg.channel.sendMessage(`Please enter in format \`${config.prefix} fuckoff @Who to fuck\``)

	snekfetch.get("https://www.foaas.com/operations").then(b => {
		let ep = b.body[Math.floor(Math.random() * b.body.length)]
		snekfetch
		.get(`https://www.foaas.com${ep.url}`)
		.set("Accept", "application/json")
		.then(bd => {
			msg.channel.sendMessage(`${bd.body.message.replace(/:name/g, args[0]).replace(/:reaction/g, "drink bleach").replace(":from", msg.author.username).replace(/:reference/g, msg.author.username).replace(/:behavior/g, "with a passion").replace(/:noun/g, "dick").replace(/:do/g, "fuck").replace(/:something/g, "fucker").replace(/:thing/g, "server").replace(/:company/g, "them").replace(/:tool/g, "your brain")} ${bd.body.subtitle.replace(":from", msg.author.username).replace(/:reference/g, msg.author.username)}`)
		})
	})
}
