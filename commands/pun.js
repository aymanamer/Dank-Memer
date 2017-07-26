const pun = require('../assets/arrays.json').pun

exports.run = async function (client, msg, args, utils) {
	msg.channel.send(utils.randomInArray(pun))
}
