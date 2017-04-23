exports.run = function (client, msg, args) {

const needle = require('needle')
    needle.get(`https://martmists.com/api/v1/eyes?url=${msg.author.avatarURL}`, (err, res) => {
        if (err) return msg.channel.sendMessage('I couldn\'t find any eyes!')
        msg.channel.sendFile(res.body, "eyes.png")
    })
}
