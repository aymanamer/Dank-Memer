exports.run = function (client, msg, args) {
let avatarurl = msg.mentions.users.size > 0 ? msg.mentions.users.first().displayAvatarURL.replace("gif", "png") : msg.author.displayAvatarURL.replace("gif", "png")
const needle = require('needle')
    needle.get(`https://martmists.com/api/v1/magik?url=${avatarurl}`, (err, res) => {
        if (err) return msg.channel.sendMessage('You just aren\'t magik enough :(')
        msg.channel.sendFile(res.body, "magik.png")
    })
}
