const { randomInArray } = require('../utils')
const { shitposts } = require('../assets/arrays.json')

exports.run = async function (client, msg) {
	msg.channel.send(randomInArray(shitposts), { split: true })
}
