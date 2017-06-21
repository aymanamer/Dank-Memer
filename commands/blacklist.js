const fs = require('fs')
const bl = require('../blacklist.json')
exports.run = function (undefined, msg, args) {
	if (msg.mentions.users.size) {
		bl.people = bl.people.concat(msg.mentions.users.map(u => u.id))
		fs.writeFile('./blacklist.json', JSON.stringify(bl, '', '\t'), (err) => {
        	if (err)
            	return msg.channel.send('Well fuck. ' + err.message)
			else
				msg.channel.send(`${msg.mentions.users.map(u => u.username).join(', ')} blocked.`)
    	})
	} else if (parseInt(args[0])) {
		bl.people = bl.people.concat(args.filter(arg => parseInt(arg)))
		fs.writeFile('./blacklist.json', JSON.stringify(bl, '', '\t'), (err) => {
        	if (err)
            	return msg.channel.send('Well fuck. ' + err.message)
			else
				msg.channel.send(`${args.filter(arg => parseInt(arg)).join(', ')} blocked.`)
    	})
	}
}