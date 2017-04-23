exports.run = function (client, msg, args) {
    var Jimp = require('jimp')
    if (msg.mentions.users.size === 0) {
        return msg.channel.sendMessage("You must mention a user or provide a link!")
    } else {
        msg.channel.sendMessage(":gear: Generating... please wait.").then(mesg => {
            Jimp.read(msg.mentions.users.first().displayAvatarURL, (err, avatar) => {
              
                if (err) return mesg.edit(":warning: Failed to generate image")
                
                avatar.invert()
                avatar.getBuffer(Jimp.MIME_PNG, (err, buffer) => {
                    try {
                    mesg.delete()
                    msg.channel.sendFile(buffer)
                    } catch (e) {
                        console.log(e)
                        msg,reply('there was an error with this command.')
                    }
                })
            })
        })
    } //else statement
}
