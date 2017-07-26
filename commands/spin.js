const { spinners, diseases } = require('../assets/arrays.json')
const time = Math.floor(Math.random() * 60 + 1) * 4

exports.run = async function (client, msg, args, utils) {
	await msg.channel.send(`Your ${utils.randomInArray(spinners)} spun for ${utils.timeCon(time)} Congratulations, you now have ${utils.randomInArray(diseases)}.`)
}

