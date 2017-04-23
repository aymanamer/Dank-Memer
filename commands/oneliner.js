const oneLinerJoke = require("one-liner-joke")

exports.run = function (client, msg) {
    msg.reply(decodeURI(oneLinerJoke.getRandomJoke().body))
}
