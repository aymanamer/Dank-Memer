const snakefetch = require('snekfetch')

exports.run = async function (client, msg, args, config) {

	if (!msg.channel.permissionsFor(client.user.id).has('ATTACH_FILES'))
		return msg.reply('Well shit, there was a permission error! Make sure I have `attach files` so I can do this shit!').catch(() => console.error)

	const votes = await snakefetch.get('https://discordbots.org/api/bots/270904126974590976/votes?onlyids=1').set('Authorization', config.orgtoken)
	if (!votes.body.includes(msg.author.id))
		return msg.channel.send(`Hey, <@${msg.author.id}>! You have to go vote at https://discordbots.org/bot/270904126974590976 to use this command this week, as this bot is competing with a few others! Thank you!\n\nAll you have to do is log in via discord in the top right corner, and click "vote"!`)

	msg.channel.startTyping()

	const avatarurl = (msg.mentions.users.size > 0 ? msg.mentions.users.first().displayAvatarURL : msg.author.displayAvatarURL).replace('gif', 'png')

	const data = await snakefetch
		.get('http://get-ur-me.me/api/trigger')
		.set('Api-Key', 'XfGC62d9xKiOc4IegPdz')
		.set('data-src', avatarurl)

	if (data.status === 200) {
		await msg.channel.send({
			files: [{
				name: 'triggered.gif',
				attachment: data.body
			}]
		})
		msg.channel.stopTyping(true)
	} else {
		msg.channel.send(`Error: ${data.text}`)
		msg.channel.stopTyping(true)
	}

}