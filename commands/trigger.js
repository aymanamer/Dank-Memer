const snakefetch = require('snekfetch')

exports.run = async function (client, msg) {

	if (!msg.channel.permissionsFor(client.user.id).has('ATTACH_FILES'))
		return msg.reply('Well shit, there was a permission error! Make sure I have `attach files` so I can do this shit!').catch(() => console.error)

	msg.channel.startTyping()

	const avatarurl = (msg.mentions.users.size > 0 ? msg.mentions.users.first().displayAvatarURL : msg.author.displayAvatarURL).replace('gif', 'png')

	const data = await snakefetch
		.get('http://www.get-ur-me.me/api/trigger')
		.set('Api-Key', 'XfGC62d9xKiOc4IegPdz')
		.set('data-src', avatarurl)

	if (data.status === 200) {
		await msg.channel.send({
			files: [{
				name: 'triggered.gif',
				attachment: data.body
			}]
		})
		msg.channel.stopTyping()
	} else {
		msg.channel.send(`Error: ${data.text}`)
		msg.channel.stopTyping()
	}

}