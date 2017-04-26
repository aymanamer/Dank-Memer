exports.run = function (client, msg, args) {

const needle = require('needle')

let options = {
        headers: {
            "Api-Key": "192aa6cf36a84f69ac3f0435b8676ddf"
        }
    }
    needle.get(`https://martmists.com/api/v1/eyes?url=${msg.author.avatarURL}`, (err, res) => {
        if (err) return msg.channel.sendMessage('I couldn\'t find any eyes!')
        msg.channel.sendFile(res.body, "eyes.png")
    })
}
