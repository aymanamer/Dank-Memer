const { meme } = require('../assets/arrays.json')
const { randomInArray } = require('../utils')

exports.run = function (client, msg) {
    try {
        msg.channel.sendFile(randomInArray(meme))
    } catch (e) {
        console.log(Date() + " - " + e)
        msg.reply('no.')
    }

}
