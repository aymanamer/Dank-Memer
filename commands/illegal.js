exports.run = function (client, msg, args) {

const needle = require('needle');
    needle.get(`https://martmists.com/api/v1/illegal?query=${args.join(' ')}`, (err, res) => {
        if (err) return msg.channel.sendMessage('Congress stopped that from becoming illegal :(');
        msg.channel.sendFile(res.body, "illegal.gif")
    });
}
