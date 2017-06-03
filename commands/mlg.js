exports.run = function (client, msg, args) {
    if (!msg.guild.member(client.user).hasPermission('CONNECT')) return msg.reply('I do not have permission to connect to that voice channel! Please fix this to use this command.').catch(console.error)
    if (!msg.guild.member(client.user).hasPermission('SPEAK')) return msg.reply('I do not have permission to speak in that voice channel! Please fix this to use this command.').catch(console.error)

    let file = Math.floor((Math.random() * 19) + 1)

    if (!msg.member.voiceChannel) {
        msg.react("❌").then(() => {
            msg.reply("join a voice channel fam")

        })
    } else if (args.includes('stop')) {
        msg.member.voiceChannel.leave()
        msg.react('😢')
    } else {
        if (!client.voiceConnections.get(msg.guild.id)) {
            msg.react("👌")
            msg.member.voiceChannel.join().then(conn => {
                conn.playFile(`./assets/mlg/${file}.mp3`)
                conn.player.dispatcher.once("end", () => {
                    conn.channel.leave()
                })
            }).catch(e => {
                msg.reply("Couldn't join your voicechannel ¯\\_(ツ)_/¯")
                console.log(`${new Date()}: ${e.message}`)
            })

        } else {
            msg.reply("only one sound at once, dude.")
            msg.react("❌")
        }
    }

}