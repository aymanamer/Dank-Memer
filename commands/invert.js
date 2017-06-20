const snakefetch = require('snekfetch')

exports.run = async function (client, msg, args) {
	msg.channel.startTyping()

	let avatarurl = (msg.mentions.users.size > 0 ? msg.mentions.users.first().displayAvatarURL : msg.author.displayAvatarURL).replace('gif', 'png')

	let data = await snakefetch
        .get('http://www.get-ur-me.me/api/invert')
        .set('Api-Key', 'XfGC62d9xKiOc4IegPdz')
        .set('data-src', avatarurl)

	if (data.status === 200) {
		msg.channel.send({
			files: [{
				name: 'inverted.png',
				attachment: data.body
			}]
		})
		msg.channel.stopTyping()
	} else {
		msg.channel.send('Error: ' + data.text)
		msg.channel.stopTyping()
	}
}