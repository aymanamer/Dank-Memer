exports.run = function (client, msg, args) {
    blasphemer = require('blasphemy')
    msg.reply('you are a ' + blasphemer.blaspheme())
}