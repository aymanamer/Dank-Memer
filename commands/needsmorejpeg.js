//const snakefetch = require('snekfetch')

exports.run = async function (client, msg) {
/*
	if (!msg.channel.permissionsFor(client.user.id).has('ATTACH_FILES'))
		return msg.reply('Well shit, there was a permission error! Make sure I have `attach files` so I can do this shit!')

	const avatarurl = (msg.mentions.users.size > 0 ? msg.mentions.users.first().displayAvatarURL : msg.author.displayAvatarURL).replace('gif', 'png')
	const data = await snakefetch
		.get('http://get-ur-me.me/api/jpeg')
		.set('Api-Key', 'XfGC62d9xKiOc4IegPdz')
		.set('data-src', avatarurl)

	if (data.status === 200)
		await msg.channel.send({files: [{name: 'needsmorejpeg.png', attachment: data.body}]})
	else msg.channel.send(`Error: ${data.text}`)

	*/
	msg.channel.send('Due to lack of use and high CPU usage, this command has been removed.\n\nTo tell Melmsie you want it back, do `pls bother gib me my jpeg image back!`')
}