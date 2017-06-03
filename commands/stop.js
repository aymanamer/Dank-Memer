exports.run = function (client, msg, args) {
    if (client.user.voiceChannel) {
        if (msg.author.voiceChannel) {
            client.voiceConnections.get(msg.guild.id).channel.leave()
            msg.react('😢')
        }
    } else {
        return msg.channel.send('I\'m not even in a voice channel <:waitwhat:320387072290455554> ')
    }
}
