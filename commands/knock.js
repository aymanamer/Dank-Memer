const ytdl = require('ytdl-core')

exports.run = function (client, msg, args) {
	if (!msg.member.voiceChannel) {
		msg.react('❌').then(() => {
			msg.reply('join a voice channel fam')    
		})
	} else if (args.includes('stop')) {
		msg.member.voiceChannel.leave()
		msg.react('😢')
	} else {
		if (!client.voiceConnections.get(msg.guild.id)) {
			msg.react('👌')
			msg.member.voiceChannel.join().then(conn => {
				const stream = ytdl('https://www.youtube.com/watch?v=ZqNpXJwgO8o', { filter: 'audioonly' })
				const dispatcher = conn.playStream(stream)
				conn.player.dispatcher.once('end', () => {
					conn.channel.leave()
				})
			}).catch(e => {
				msg.reply('There was an error knocking')
				console.log(`${new Date()}: ${e.message}`)
			})
		} else {
			msg.reply('I can\'t play two sounds at once')
			msg.react('❌')
		}
	}

}