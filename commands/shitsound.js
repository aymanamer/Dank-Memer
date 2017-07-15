const file = Math.floor(Math.random() * 75 + 1)
const snakefetch = require('snekfetch')
exports.run = async function (client, msg, args, config) {

	const votes = await snakefetch.get('https://discordbots.org/api/bots/270904126974590976/votes?onlyids=1').set('Authorization', config.orgtoken)
	if (!votes.body.includes(msg.author.id))
		return msg.channel.send(`Hey, <@${msg.author.id}>! You have to go vote at https://discordbots.org/bot/270904126974590976 to use this command this week, as this bot is competing with a few others! Thank you!\n\nAll you have to do is log in via discord in the top right corner, and click "vote"!`)


	if (!msg.channel.permissionsFor(client.user.id).has(['CONNECT', 'SPEAK', 'ADD_REACTIONS']))
		return msg.reply('Well shit, there was a permission error! Make sure I have `add reactions`, connect`, and `speak` so I can do this shit!').catch(() => console.error)

	if (!msg.member.voiceChannel) {
		await msg.react('❌')
		msg.reply('join a voice channel fam')
	} else {
		if (!client.voiceConnections.get(msg.guild.id)) {
			msg.react('📢')
			const conn = await msg.member.voiceChannel.join()
			conn.playFile(`./assets/shitsound/${file}.opus`)
			conn.player.dispatcher.once('end', () => {
				conn.channel.leave()
			})
		} else {
			await msg.react('😠')
			msg.reply('I only have one mouth, dude. Please wait until the current sound is done or the ear-rape ghost will visit you in your sleep!')
		}
	}
}