const snakefetch = require('snekfetch')
const Jimp = require('jimp')

exports.run = async function (client, msg) {

	if (!msg.channel.permissionsFor(client.user.id).has('ATTACH_FILES')) {
		return msg.reply('Well shit, there was a permission error! Make sure I have `attach files` so I can do this shit!').catch(() => console.error)
	}


	const avatarurl = (msg.mentions.users.size > 0 ? msg.mentions.users.first().displayAvatarURL : msg.author.displayAvatarURL).replace('gif', 'png')
	const authorurl = (msg.mentions.users.size > 0 ? msg.author.displayAvatarURL.replace('gif', 'png') : client.user.displayAvatarURL).replace('gif', 'png')



	const [avatar, author] = await Promise.all([
		Jimp.read(avatarurl),
		Jimp.read(authorurl)
	])
	const bat = await Jimp.read('./resources/batman/batman.jpg').catch(err => {
		reject(err)
	})

	avatar.resize(150, 150)
	author.resize(130, 130)
	bat.resize(670, 400)
	bat.composite(avatar, 390, 215)
	bat.composite(author, 240, 75)
	bat.getBuffer(Jimp.MIME_PNG, (err, buffer) => {
		if (err)
			return reject(err)
		resolve(buffer)
	})
	
	if (data.status === 200)
		await msg.channel.send({files: [{name: 'slap.png', attachment: data.body}]})
	else msg.channel.send(`Error: ${data.text}`)

}