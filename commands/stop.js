exports.run = async function (client, msg) {
	if (!client.voiceConnections.get(msg.guild.id)) { return }
	if (!msg.member.voiceChannel) {
		return msg.channel.send('You\'re not even in a voice channel <:waitwhat:320387072290455554>')
	}
	if (msg.member.voiceChannel.id !== client.voiceConnections.get(msg.guild.id).channel.id) {
		return msg.channel.send('You\'re not even in my voice channel <:waitwhat:320387072290455554>')

	}
	await client.voiceConnections.get(msg.guild.id).dispatcher.end()
	msg.react('325734612976402432')
}