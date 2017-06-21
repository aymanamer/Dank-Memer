const snekfetch = require('snekfetch')
const { randomInArray } = require('../utils')

exports.run = async function (undefined, msg, args, config) {
	if (!args[0]) 
		return msg.channel.send(`Please enter in format \`${config.prefix} fuckoff @Who to fuck\``)

	let b = await snekfetch.get('https://www.foaas.com/operations')

	let ep = randomInArray(b.body)

	let bd = await snekfetch
			.get(`https://www.foaas.com${ep.url}`)
			.set('Accept', 'application/json')

	let response = bd.body.message
		.replace(/:name/g, args[0])
		.replace(/:reaction/g, 'drink bleach')
		.replace(':from', msg.author.username)
		.replace(/:reference/g, msg.author.username)
		.replace(/:behavior/g, 'with a passion')
		.replace(/:noun/g, 'dick')
		.replace(/:do/g, 'fuck')
		.replace(/:something/g, 'fucker')
		.replace(/:thing/g, 'server')
		.replace(/:company/g, 'them')
		.replace(/:tool/g, 'your brain')
		+ ' ' +
		bd.body.subtitle
		.replace(':from', msg.author.username)
		.replace(/:reference/g, msg.author.username)
		
	msg.channel.send(response)
}
