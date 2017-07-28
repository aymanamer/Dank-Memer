const sf = require('snekfetch')
const gm = require('gm').subClass({
	imageMagick: true
})

exports.run = async function (client, msg, args) {
	if (!msg.channel.permissionsFor(client.user.id).has('ATTACH_FILES')) {
		return msg.reply('Well shit, there was a permission error! Make sure I have `attach files` so I can do this shit!')
	}

	let avatarurl = (msg.mentions.users.size > 0 ? msg.mentions.users.first().displayAvatarURL : msg.author.displayAvatarURL).replace('gif', 'png')
	if (['jpg', 'jpeg', 'gif', 'png', 'webp'].some(x => args.join(' ').includes(x))) {
		avatarurl = args.join(' ').replace(/gif|webp/g, 'png')
	}

	const data = await sf.get(avatarurl)
	gm(data.body)
		.implode(`-${getRandomInt(3, 15)}`)
		.roll(`+${getRandomInt(0, 256)}+${getRandomInt(0, 256)}`)
		.swirl(`${getRandomInt(0, 1) === 1 ? '+' : '-'}${getRandomInt(120, 180)}`)
		.toBuffer('PNG', async (err, buf) => {
			try {
				await msg.channel.send({
					files: [{
						name: 'warp.png',
						attachment: buf
					}]
				})
			} catch (e) {
				msg.channel.send(err)
			}
		})
}

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min
}