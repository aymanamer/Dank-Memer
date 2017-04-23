const { vaporize } = require('../utils')

exports.run = function (client, msg, args) {
	if (!args[0]) return msg.reply("You gotta give me something to vaporize :eyes:")
    msg.reply(vaporize(args.join(" ")))
}
