const snakefetch = require('snekfetch')

exports.run = async function (client, msg) {

	if (!msg.channel.permissionsFor(client.user.id).has('ATTACH_FILES'))
		return msg.reply('Well shit, there was a permission error! Make sure I have `attach files` so I can do this shit!').catch(() => console.error)

	msg.channel.startTyping()

	const avatarurl = (msg.mentions.users.size > 0 ? msg.mentions.users.first().displayAvatarURL : msg.author.displayAvatarURL).replace('gif', 'png')

	const data = await snakefetch
		.get('http://get-ur-me.me/api/warp')
		.set('Api-Key', 'XfGC62d9xKiOc4IegPdz')
		.set('data-src', avatarurl)

	if (data.status === 200) {
		await msg.channel.send({
			files: [{
				name: 'warp.png',
				attachment: data.body
			}]
		})
		msg.channel.stopTyping(true)
	} else if (data.status === 400) {
		msg.channel.send('You dun got a 400! That means you got a naughty, naughty request.')
		msg.channel.stopTyping(true)
	}

}