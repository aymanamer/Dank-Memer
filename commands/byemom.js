const snakefetch = require('snekfetch')

exports.run = async function (client, msg, args) {

	if (!msg.channel.permissionsFor(client.user.id).has('ATTACH_FILES'))
		return msg.reply('Well shit, there was a permission error! Make sure I have `attach files` so I can do this shit!').catch(() => console.error)

	const avatarurl = msg.mentions.users.size > 0 ? msg.mentions.users.first().displayAvatarURL.replace('gif', 'png') : msg.author.displayAvatarURL.replace('gif', 'png')

	if (msg.mentions.users.size > 0) args = args.join(' ').substr(21)
	else args = args.join(' ')

	if (args.length < 1)
		return msg.channel.send('What do you want to google search?')
	if (args.length > 140)
		return msg.channel.send(`Google Search too long. You're ${args.length - 140} characters over the limit!`)

	const data = await snakefetch
		.get('http://get-ur-me.me/api/byemom')
		.set('Api-Key', 'XfGC62d9xKiOc4IegPdz')
		.set('data-src', JSON.stringify([`${avatarurl}`, `${args}`]))

	if (data.status === 200)
		await msg.channel.send({ files: [{ name: 'mom.png', attachment: data.body }] })
	else msg.channel.send(`Error: ${data.text}`)

}
