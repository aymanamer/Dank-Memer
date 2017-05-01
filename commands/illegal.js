exports.run = function (client, msg, args) {

const needle = require('needle');

let options = {
        headers: {
            "Api-Key": "192aa6cf36a84f69ac3f0435b8676ddf"
        }
    }
    needle.get(`https://martmists.com/api/v2/illegal?query=${args.join(' ')}`, (err, res) => {
        if (err) return msg.channel.sendMessage('Congress stopped that from becoming illegal :(')
        msg.channel.startTyping().then(() => {
            msg.channel.sendFile(res.body, "illegal.gif").then(() => {
                msg.channel.stopTyping(true)
            })
        })
    });
}
