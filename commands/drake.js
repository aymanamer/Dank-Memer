const snakefetch = require('snekfetch')

exports.run = async function (client, msg) {

	if (!msg.channel.permissionsFor(client.user.id).has('ATTACH_FILES'))
		return msg.reply('Well shit, there was a permission error! Make sure I have `attach files` so I can do this shit!').catch(() => console.error)

	msg.channel.startTyping()

	const avatarurl = (msg.mentions.users.size > 0 ? msg.mentions.users.first().displayAvatarURL : msg.author.displayAvatarURL).replace('gif', 'png')
	const authorurl = msg.mentions.users.size > 0 ? msg.author.displayAvatarURL.replace('gif', 'png') : client.user.displayAvatarURL.replace('gif', 'png')

	const data = await snakefetch
		.get('http://get-ur-me.me/api/drake')
		.set('Api-Key', 'XfGC62d9xKiOc4IegPdz')
		.set('data-src', JSON.stringify([`${avatarurl}`, `${authorurl}`]))

	if (data.status === 200) {
		msg.channel.send({
			files: [{
				name: 'drake.png',
				attachment: data.body
			}]
		})

		msg.channel.stopTyping()

	} else {
		msg.channel.send(`Well fuck. ${data.text}`)
		msg.channel.stopTyping()
	}

}