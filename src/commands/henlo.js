const {
	henlo
} = require('../assets/arrays.json')
exports.run = async function (Memer, msg, args) {
	let mention
	let text
	if (!args[0]) {
		console.log('1')
		mention = msg.author.username
		text = Memer.randomInArray(henlo)
	} else if (msg.mentions.length > 0) {
		console.log('2')
		mention = msg.mentions[0].username
		text = args[1] ? args[1] : Memer.randomInArray(henlo)
	} else if (msg.mentions.length === 0) {
		console.log('3')
		mention = msg.author.username
		text = args[0] ? args[0] : Memer.randomInArray(henlo)
	} else {
		console.log('4')
		return msg.create('hmm, you seemed to find a way to break this. GG at beating my 5am brain.')
	}
	console.log('5')
	msg.channel.create(`henlo ${mention}\nyou stinky ${mention}\ngo ${text} ugly`)
}

exports.props = {
	name: 'henlo',
	usage: '{command} @user thing to do',
	aliases: ['stinky'],
	cooldown: 1000,
	description: 'teach that stinky BOI a lesson'
}