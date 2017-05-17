exports.run = function (client, msg, args) {
    const ytdl = require('ytdl-core')
    let mlg = ["https://www.youtube.com/watch?v=ltZ6dtr1Abo", "https://www.youtube.com/watch?v=ApcFBZVbAPA", "https://www.youtube.com/watch?v=4zuQfIGcpBQ", "https://www.youtube.com/watch?v=htq8lim23Ug", "https://www.youtube.com/watch?v=ss7q8bTDskU", "https://www.youtube.com/watch?v=gzSxBoxxzVM", "https://www.youtube.com/watch?v=g1uKIA7qjgM", "https://www.youtube.com/watch?v=BzrLzqL3A44", "https://www.youtube.com/watch?v=vg7ZrQKExIo", "https://www.youtube.com/watch?v=jaOGGIfJkJk", "https://www.youtube.com/watch?v=u1eoHBzS9E8", "https://www.youtube.com/watch?v=SQhuC-I5sD8", "https://www.youtube.com/watch?v=D62L3husEa0", "https://www.youtube.com/watch?v=tx1LX80fot8", "https://www.youtube.com/watch?v=IR5KWeZRtrw", "https://www.youtube.com/watch?v=QxB5A7tFvZM", "https://www.youtube.com/watch?v=GSSZdwL67Ok", "https://www.youtube.com/watch?v=mVHJ6OwTYWc", "https://www.youtube.com/watch?v=dURU4zD2z5Q", "https://www.youtube.com/watch?v=FRatgC3S0IA&feature=youtu.be", "https://www.youtube.com/watch?v=HiLn2yrM1GM&feature=youtu.be", "https://www.youtube.com/watch?v=PgdtZNdgHy8&feature=youtu.be"]
    const {
        randomInArray
    } = require('../utils')
    if (!msg.member.voiceChannel) {
        msg.react("❌").then(()=> {
            msg.reply("join a voice channel fam")
            
        })
    } else if(args.includes('stop')){
        msg.member.voiceChannel.leave()
        msg.react('😢')
    } else {
        if (!client.voiceConnections.get(msg.guild.id)) {
            msg.react("👌")
            msg.member.voiceChannel.join().then(conn => {
                const stream = ytdl(randomInArray(mlg), { filter: 'audioonly' })
                const dispatcher = conn.playStream(stream)
                conn.player.dispatcher.once("end", () => {
                    conn.channel.leave()
                })
            }).catch(e => {
                msg.reply("there was an error playing this dank MLG remix")
                console.log(`${new Date()}: ${e.message}`)
            })

        } else {
            msg.reply("only one mlg song at once, dude.")
            msg.react("❌")
        }
    }

}
