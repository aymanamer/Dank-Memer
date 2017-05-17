exports.run = function (client, msg, args) {
    const ytdl = require('ytdl-core')
    let shit = ["https://www.youtube.com/watch?v=Ks_e_g4xHZo", "https://www.youtube.com/watch?v=bJnyD5AKrXw", "https://www.youtube.com/watch?v=FnzSGSDhbqg", "https://www.youtube.com/watch?v=bFoKhknf_wA", "https://www.youtube.com/watch?v=gFz4ExfYqyk", "https://www.youtube.com/watch?v=ek5M4BCuRG0", "https://www.youtube.com/watch?v=S1jT7nl3PHc", "https://www.youtube.com/watch?v=waD6a7vCmM0&list=PLv3TTBr1W_9tpgsEZEf3RY1GwJR9lDTni", "https://www.youtube.com/watch?v=oZ-u5XZ6OME", "https://www.youtube.com/watch?v=a4xa_NTddgA", "https://www.youtube.com/watch?v=g-sgw9bPV4A", "https://www.youtube.com/watch?v=lXMskKTw3Bc", "https://www.youtube.com/watch?v=xFSwIw-_-as", "https://www.youtube.com/watch?v=Yme7fUAIwGs", "https://www.youtube.com/watch?v=VALJZBKFEFQ", "https://www.youtube.com/watch?v=K5tVbVu9Mkg", "https://www.youtube.com/watch?v=hAEQvlaZgKY", "https://www.youtube.com/watch?v=SQoA_wjmE9w", "https://www.youtube.com/watch?v=SW-BU6keEUw", "https://www.youtube.com/watch?v=gYOEyzBFYa4", "https://www.youtube.com/watch?v=cU8HrO7XuiE", "https://www.youtube.com/watch?v=tVj0ZTS4WF4", "https://www.youtube.com/watch?v=ZZ5LpwO-An4", "https://www.youtube.com/watch?v=VfCYZ3pks48", "https://www.youtube.com/watch?v=Kppx4bzfAaE", "https://www.youtube.com/watch?v=IwUyVm_sRxM", "https://www.youtube.com/watch?v=RMDItOwN_SU", "https://www.youtube.com/watch?v=q6EoRBvdVPQ&list=PL7XlqX4npddfrdpMCxBnNZXg2GFll7t5y", "https://www.youtube.com/watch?v=v3i8vsIUA7Q&list=PL7XlqX4npddfrdpMCxBnNZXg2GFll7t5y&index=10", "https://www.youtube.com/watch?v=BJ0xBCwkg3E&list=RDQMmE5LydAwbqE&index=4", "https://www.youtube.com/watch?v=vTIIMJ9tUc8&index=9&list=RDQMmE5LydAwbqE", "https://www.youtube.com/watch?v=6E5m_XtCX3c&index=14&list=RDQMmE5LydAwbqE", "https://www.youtube.com/watch?v=3Q12xOukVAI&index=17&list=RDQMmE5LydAwbqE", "https://www.youtube.com/watch?v=_V2sBURgUBI&index=19&list=RDQMmE5LydAwbqE", "https://www.youtube.com/watch?v=KolfEhV-KiA&index=23&list=RDQMmE5LydAwbqE", "https://www.youtube.com/watch?v=q6-ZGAGcJrk&index=24&list=RDQMmE5LydAwbqE", "https://www.youtube.com/watch?v=OJw3MmL-Omk&index=30&list=RDQMmE5LydAwbqE", "https://www.youtube.com/watch?v=J1c2KzJbcGA&index=27&list=RDQMmE5LydAwbqE", "https://www.youtube.com/watch?v=eCiFO7qV54E&index=28&list=RDQMmE5LydAwbqE", "https://www.youtube.com/watch?v=J---aiyznGQ&list=RDQMmE5LydAwbqE&index=28", "https://www.youtube.com/watch?v=pCOb6Fykxz0&index=33&list=RDQMmE5LydAwbqE", "https://www.youtube.com/watch?v=k85mRPqvMbE&list=RDQMmE5LydAwbqE&index=27", "https://www.youtube.com/watch?v=5-2nByd2cr4&list=RDQMmE5LydAwbqE&index=27", "https://www.youtube.com/watch?v=_hI0qMtdfng&index=28&list=RDQMmE5LydAwbqE", "https://www.youtube.com/watch?v=oF9yHO-UUws&list=RDQMmE5LydAwbqE&index=27", "https://www.youtube.com/watch?v=-TcLxlkc2pA&list=RDQMmE5LydAwbqE&index=31", "https://www.youtube.com/watch?v=vfc42Pb5RA8&index=30&list=RDQMmE5LydAwbqE", "https://www.youtube.com/watch?v=2k0SmqbBIpQ&list=RDQMmE5LydAwbqE&index=27", "https://www.youtube.com/watch?v=DOWbvYYzAzQ&list=RDQMmE5LydAwbqE&index=27", "https://www.youtube.com/watch?v=1Bix44C1EzY&index=27&list=RDQMmE5LydAwbqE", "https://www.youtube.com/watch?v=EwTZ2xpQwpA", "https://www.youtube.com/watch?v=fbGkxcY7YFU", "https://www.youtube.com/watch?v=wCF3ywukQYA", "https://www.youtube.com/watch?v=kp5gbhaMPxM", "https://www.youtube.com/watch?v=_yH5iyn81Ks", "https://www.youtube.com/watch?v=h1VaeqyTpgY"]
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
                const stream = ytdl(randomInArray(shit), { filter: 'audioonly' })
                const dispatcher = conn.playStream(stream)
                conn.player.dispatcher.once("end", () => {
                    conn.channel.leave()
                })
            }).catch(e => {
                msg.reply("There was an error playing this dank moosic")
                console.log(`${new Date()}: ${e.message}`)
            })

        } else {
            msg.reply("Only have one shit song at once, dude.")
            msg.react("❌")
        }
    }

}