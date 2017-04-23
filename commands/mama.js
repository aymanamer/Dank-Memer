const superagent = require("superagent")

exports.run = function (client, msg) {
	superagent
	.get("http://api.yomomma.info/")
	.then(bd => {
		msg.reply(JSON.parse(bd.text).joke)
	})
	.catch(() => {
		msg.reply("Yo momma must've sat on the network because the API is down")
	})
}
