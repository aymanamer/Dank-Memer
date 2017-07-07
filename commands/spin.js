const { spinners } = require('../assets/arrays.json')
const { diseases } = require('../assets/arrays.json')
const spin = Math.floor(Math.random() * 60 + 1) * 4

const fspinner = spinners[Math.floor(Math.random() * spinners.length)]
const sickness = diseases[Math.floor(Math.random() * diseases.length)]

exports.run = function (client, msg) {
	msg.channel.send(`Your ${fspinner} spun for ${timeCon(spin)} Congratulations, you now have ${sickness}.`)
}

function timeCon (time) {
	let days = Math.floor(time % 31536000 / 86400)
	let hours = Math.floor(time % 31536000 % 86400 / 3600)
	let minutes = Math.floor(time % 31536000 % 86400 % 3600 / 60)
	let seconds = Math.round(time % 31536000 % 86400 % 3600 % 60)
	days = days > 9 ? days : days
	hours = hours > 9 ? hours : hours
	minutes = minutes > 9 ? minutes : minutes
	seconds = seconds > 9 ? seconds : seconds
	return (parseInt(days) > 0 ? days + (days > 1 ? ' days ' : ' day ') : '') + (parseInt(hours) === 0 && parseInt(days) === 0 ? '' : hours + (hours > 1 ? ' hours ' : ' hour ')) + (parseInt(minutes) === 0 && parseInt(hours) === 0 && parseInt(days) === 0 ? '' : minutes + (minutes > 1 ? ' minutes ' : ' minute ')) + seconds + (seconds > 1 ? ' seconds. ' : ' second. ')
}