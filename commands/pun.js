const { pun } = require('../assets/arrays.json')
const { randomInArray } = require('../utils')

exports.run = function (undefined, msg) {
	msg.channel.send(randomInArray(pun))
}
