const superagent = require("superagent");

const { randomInArray } = require('../utils')
const { pup } = require('../assets/arrays.json')

exports.run = async function (client, msg) {
	const notice = await msg.channel.sendMessage(randomInArray(pup))
	let pupper = await superagent.get("http://random.dog/woof")

	setTimeout(() => {
		msg.channel.sendFile("http://random.dog/" + pupper.text).then(() => {
			notice.delete()
		})
	}, 2000)
}
