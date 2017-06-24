const fs = require('fs')
const bl = require('../blacklist.json')
exports.run = function (client, msg, args, undefined, Discord) {
	if (msg.author.id !== config.owner) return
	if (!args[0] || !['add', 'remove'].includes(args[0].toLowerCase()) || !args[1])
		return msg.channel.send('Argument error. Make sure your first argument is one of `add` or `remove`.')
	if (args[0].toLowerCase() === 'add') {
		if (msg.mentions.users.size) {
			client.blacklist.people = client.blacklist.people.concat(msg.mentions.users.map(u => u.id))
			fs.writeFile('./blacklist.json', JSON.stringify(client.blacklist, '', '\t'), (err) => {
        		if (err)
            		return msg.channel.send('Well fuck. \n' + err.stack)
				else
					msg.channel.send(`${msg.mentions.users.map(u => u.username).join(', ')} blocked.`)
    		})
		} else if (parseInt(args[1])) {
			client.blacklist.people = client.blacklist.people.concat(args.filter(arg => parseInt(arg)))
			fs.writeFile('./blacklist.json', JSON.stringify(client.blacklist, '', '\t'), (err) => {
        		if (err)
            		return msg.channel.send('Well fuck. ' + err.message)
				else
					msg.channel.send(`${args.filter(arg => parseInt(arg)).join(', ')} blocked.`)
    		})
		}
	} else if (args[0].toLowerCase() === 'remove') {
		if (msg.mentions.users.size) {
			msg.mentions.users.map(user => {
				args[1] = user.id
				if (client.blacklist.people.indexOf(args[1]) === -1)  
					return msg.channel.send(`\`${args[1]}\` not found in blocked database. Please block to unblock. :^)`)
				bl.people.splice(bl.people.indexOf(args[1]), 1)
			})
		} else if (parseInt(args[1])) {
			args.filter(arg => parseInt(arg)).map(id => {
				args[1] = id
				if (client.blacklist.people.indexOf(args[1]) === -1)
					return msg.channel.send(`\`${args[1]}\` not found in blocked database. Please block to unblock. :^)`)
				bl.people.splice(bl.people.indexOf(args[1]), 1)
			})
		}
		fs.writeFile('./blacklist.json', JSON.stringify(client.blacklist, '', '\t'), (err) => {
        	if (err)
            	return msg.channel.send('Well fuck. ' + err.message)
			else
				msg.channel.send('Buncha people unblocked, probably, or something. ¯\\_(ツ)_/¯')
    	})
	}
}