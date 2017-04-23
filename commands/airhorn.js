exports.run = function (client, msg, args) {
    if (!msg.member.voiceChannel) return msg.reply("Join a voice channel fam")
    msg.react("👌")

    msg.member.voiceChannel.join().then(conn => {
        conn.playFile("./assets/horn.mp3")
        conn.player.dispatcher.once("end", () => {
            conn.channel.leave();
        });
    }).catch(e => {
        msg.reply("Couldn't join your voicechannel ¯\_(ツ)_/¯")
        console.log(`${new Date()}: ${e.message}`)
    })
}
