/*
  Created by Matrix159 on 4/13/2017, rewritten/fixed by CrimsonXV on 4/21/2017. matrixpls
 */

const superagent = require('superagent')
exports.run = function (client, msg, args) {

	if (args.length < 1) return msg.channel.sendMessage(`Please enter in format \`${prefixes[msg.guild.id]} fo @Who to fuck\``)

	superagent.get("https://www.foaas.com/operations").then(b => {
		let ep = b.body[Math.floor(Math.random() * b.body.length)]
		superagent
		.get(`https://www.foaas.com${ep.url}`)
		.set("Accept", "application/json")
		.then(bd => {
			msg.channel.send(`${bd.body.message.replace(/:name/g, args[0]).replace(/:reaction/g, "drink bleach").replace(":from", msg.author.username).replace(/:reference/g, msg.author.username).replace(/:behavior/g, "with a passion").replace(/:noun/g, "dick").replace(/:do/g, "fuck").replace(/:something/g, "fucker").replace(/:thing/g, "server").replace(/:company/g, "them").replace(/:tool/g, "your brain")} ${bd.body.subtitle.replace(":from", msg.author.username).replace(/:reference/g, msg.author.username)}`)
		})
	})
}
