const ytdl = require('ytdl-core')
const { scare } = require('../assets/arrays.json')
const { randomInArray } = require('../utils')
exports.run = function (client, msg, args) {
	if (!msg.member.voiceChannel) {
		msg.react('❌').then(() => {
			msg.reply('join a voice channel fam')
		})
	} else if (args.includes('stop')) {
		msg.member.voiceChannel.leave()
		msg.react('😢')
	} else {
		if (!msg.guild.member(client.user).hasPermission('CONNECT')) 
			return msg.reply('I do not have permission to connect to that voice channel! Please fix this to use this command.').catch(console.error)
		if (!msg.guild.member(client.user).hasPermission('SPEAK')) 
			return msg.reply('I do not have permission to speak in that voice channel! Please fix this to use this command.').catch(console.error)
			
		if (!client.voiceConnections.get(msg.guild.id)) {
			msg.react('😱')
			msg.member.voiceChannel.join().then(conn => {
				const stream = ytdl(randomInArray(scare), { filter: 'audioonly' })
				const dispatcher = conn.playStream(stream)
				conn.player.dispatcher.once('end', () => {
					conn.channel.leave()
				})
			}).catch(e => {
				msg.reply('there was an error while scaring them')
				console.log(`${new Date()}: ${e.message}`)
			})

		} else {
			msg.reply('only one sound at once, dude.')
			msg.react('❌')
		}
	}
}
