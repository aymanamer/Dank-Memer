const { meme } = require('../assets/arrays.json')
const { randomInArray } = require('../utils')

if (!msg.channel.permissionsFor(client.user.id).has("ATTACH_FILES")) {
    return msg.author.send('I don\'t have permission to send pictures in #' + msg.channel.name)
}

exports.run = function (client, msg) {
    try {
        msg.channel.send({
            files: [randomInArray(meme)]
        })
       
    } catch (e) {
        console.log(Date() + " - " + e)
        msg.reply('no.')
    }

}
