exports.run = function (client, msg, args) {
    let dispatcher;
    if (!msg.member.voiceChannel) {
        msg.react('❌').then(() => {
            msg.reply('join a voice channel fam')
        })
    } else {
        const file = Math.floor(Math.random() * 30 + 1)
        const vc = msg.member.voiceChannel

        if (!client.voiceConnections.get(msg.guild.id)) {

            msg.react('💩')
            vc.join()
            dispatcher = msg.guild.voiceConnection.playFile(`./assets/shitsound/${file}.opus`)

            dispatcher.once('end', () => {
                vc.leave()
            })

        } else {

            msg.reply('skipping to a new shitsound')
            const file = Math.floor(Math.random() * 30 + 1)
            msg.react('💩')

            dispatcher.end()
dispatcher = msg.guild.voiceConnection.playFile(`./assets/shitsound/${file}.opus`)
            dispatcher.once('end', () => {
                vc.leave()
            })

        }
    }
}