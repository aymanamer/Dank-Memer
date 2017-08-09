const { spinners, diseases } = require('../assets/arrays.json')

exports.run = async function (Memer, msg) {
	msg.channel.createMessage(`Your ${Memer.randomInArray(spinners)} spun for ${Memer.timeCon(Math.floor(Math.random() * 60 + 1) * 4)}Congratulations, you now have ${Memer.randomInArray(diseases)}.`)
}