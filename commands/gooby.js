//const { gooby } = require('../assets/arrays.json')
//const { randomInArray } = require('../utils')

exports.run = async function (client, msg) {
/*
	if (!msg.channel.permissionsFor(client.user.id).has('ATTACH_FILES'))
		return msg.author.send(`I don't have permission to send pictures in #${msg.channel.name}`)

	msg.channel.send({
		files: [randomInArray(gooby)]
	})
*/
	await msg.channel.send('Due to lack of use, this command has been removed.\n\nTo tell Melmsie you want it back, do `pls bother gib me my gooby pictures back!`')
}
