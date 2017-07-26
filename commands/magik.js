//const gm = require('gm').subClass({imageMagick: true})
//const sf = require('snekfetch')

exports.run = async function (client, msg) {
/*
	if (!msg.channel.permissionsFor(client.user.id).has('ATTACH_FILES'))
		{return msg.reply('Well shit, there was a permission error! Make sure I have `attach files` so I can do this shit!').catch(() => console.error)}

	const avatarurl = (msg.mentions.users.size > 0 ? msg.mentions.users.first().displayAvatarURL : msg.author.displayAvatarURL).replace('gif', 'png')
	let data = await sf.get(avatarurl)
	gm(data.body)
			.implode(-8)
			.swirl(`${getRandomInt(0, 1) === 1 ? '+' : '-'}${getRandomInt(40, 80)}`)
			.toBuffer('PNG', async (err, buffer) => {
				try {
					await msg.channel.send({files: [{name: 'magik.png', attachment: buffer}]})
				} catch (e) {
					console.error(e.message)
				}
			})
			*/
	msg.channel.send('Due to lack of use and high CPU usage, this command has been removed.\n\nTo tell Melmsie you want it back, do `pls bother gib me my magik image back!`')

}
