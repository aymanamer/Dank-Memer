exports.run = function (client, msg, args) {
    const ytdl = require('ytdl-core')
    let mlg = ["https://www.youtube.com/watch?v=9199NaBB6L0", "https://www.youtube.com/watch?v=f0vmNYnRoTw", "https://www.youtube.com/watch?v=CIODJSbYCT4", "https://www.youtube.com/watch?v=DUVBSmOaWgY", "https://www.youtube.com/watch?v=Bbt77avaSv8", "https://www.youtube.com/watch?v=b5fCEgX0Uxg", "https://www.youtube.com/watch?v=XTmgE6TCgiA"]
    const {
        randomInArray
    } = require('../utils')

     if (!msg.guild.member(client.user).hasPermission('SEND_MESSAGES')) return msg.author.send('I do not have permission to send messages in that channel! Please fix this to use this command.').catch(console.error)
    if (!msg.guild.member(client.user).hasPermission('ADD_REACTIONS')) return msg.reply('I do not have permission to react to messages in this server/channel! Please fix this to use this command.').catch(console.error)
     if (!msg.guild.member(client.user).hasPermission('CONNECT')) return msg.reply('I do not have permission to connect to that voice channel! Please fix this to use this command.').catch(console.error)
        if (!msg.guild.member(client.user).hasPermission('SPEAK')) return msg.reply('I do not have permission to speak in that voice channel! Please fix this to use this command.').catch(console.error)

    if (!msg.member.voiceChannel) {
        msg.react("❌").then(()=> {
            msg.reply("join a voice channel fam")
            
        })
    } else if(args.includes('stop')){
        msg.member.voiceChannel.leave()
        msg.react('😢')
    } else {
        if (!client.voiceConnections.get(msg.guild.id)) {
            msg.react("😱")
            msg.member.voiceChannel.join().then(conn => {
                const stream = ytdl(randomInArray(mlg), { filter: 'audioonly' })
                const dispatcher = conn.playStream(stream)
                conn.player.dispatcher.once("end", () => {
                    conn.channel.leave()
                })
            }).catch(e => {
                msg.reply("there was an error while scaring them")
                console.log(`${new Date()}: ${e.message}`)
            })

        } else {
            msg.reply("only one sound at once, dude.")
            msg.react("❌")
        }
    }

}
