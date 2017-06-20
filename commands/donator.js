const fs = require('fs')
exports.run = function (client, msg, args, config) {
	if (msg.author.id !== config.owner) return

	if (!args[0] || !['1', '5', '10'].includes(args[0]))
		return msg.channel.send('Argument error. The first argument must be one of `1`, `5` or `10`.')

	if (msg.mentions.users.size) {
		config[`donor${args[0]}`] = config[`donor${args[0]}`].concat(msg.mentions.users.map(u => u.id))
		fs.writeFile('./config.json', JSON.stringify(config, '', '\t'), (err) => {
        	if (err)
            	return msg.channel.send('Well fuck. ' + err.message)
			else
				msg.channel.send(`${msg.mentions.users.map(u => u.username).join(', ')} added to donor${args[0]}.`)
    	})
	} else if (parseInt(args[1])) {
		config[`donor${args[0]}`] = config[`donor${args[0]}`].concat(args.slice(1).filter(arg => parseInt(arg)))
		fs.writeFile('./config.json', JSON.stringify(config, '', '\t'), (err) => {
        	if (err)
            	return msg.channel.send('Well fuck. ' + err.message)
			else
				msg.channel.send(`${args.slice(1).filter(arg => parseInt(arg)).join(', ')} added to donor${args[0]}.`)
    	})
	}
}