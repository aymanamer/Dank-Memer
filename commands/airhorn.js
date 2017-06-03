exports.run = function (client, msg, args) {

    if (!msg.guild.member(client.user).hasPermission('SEND_MESSAGES')) return msg.author.send('I do not have permission to send messages in that channel! Please fix this to use this command.').catch(console.error)
    if (!msg.guild.member(client.user).hasPermission('ADD_REACTIONS')) return msg.reply('I do not have permission to react to messages in this server/channel! Please fix this to use this command.').catch(console.error)
    if (!msg.member.voiceChannel) {
        if (!msg.guild.member(client.user).hasPermission('CONNECT')) return msg.reply('I do not have permission to connect to that voice channel! Please fix this to use this command.').catch(console.error)
        if (!msg.guild.member(client.user).hasPermission('SPEAK')) return msg.reply('I do not have permission to speak in that voice channel! Please fix this to use this command.').catch(console.error)

        msg.react("❌").then(() => {
            msg.reply("join a voice channel fam")
        })
    } else {
        if (!msg.guild.member(client.user).hasPermission('CONNECT')) return msg.reply('I do not have permission to connect to that voice channel! Please fix this to use this command.').catch(console.error)
        if (!msg.guild.member(client.user).hasPermission('SPEAK')) return msg.reply('I do not have permission to speak in that voice channel! Please fix this to use this command.').catch(console.error)

        if (!client.voiceConnections.get(msg.guild.id)) {
            msg.react("👌")
            msg.member.voiceChannel.join().then(conn => {
                conn.playFile("./assets/horn.mp3")
                conn.player.dispatcher.once("end", () => {
                    conn.channel.leave()
                })
            }).catch(e => {
                msg.reply("Couldn't join your voicechannel ¯\\_(ツ)_/¯")
                console.log(`${new Date()}: ${e.message}`)
            })

        } else {
            msg.reply("I only have one airhorn, dude.")
            msg.react("❌")
        }
    }

}