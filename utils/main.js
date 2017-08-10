const config = require('../config.json')

exports.disabledEvents = {
	'CHANNEL_PINS_UPDATE': true,
	'USER_SETTINGS_UPDATE': true,
	'USER_NOTE_UPDATE': true,
	'RELATIONSHIP_ADD': true,
	'RELATIONSHIP_REMOVE': true,
	'GUILD_BAN_ADD': true,
	'GUILD_BAN_REMOVE': true,
	'TYPING_START': true,
	'PRESENCE_UPDATE': true
}

exports.roleIDs = {
	'base': '334171428649959447',
	'5': '344571417074991105',
	'10': '344571468715261952'
}

exports.timeCon = time => {
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

exports.bannedWords = ['kys', 'hitler', 'nazi', 'kill your self', 'kill yourself', 'nigger', 'nagger', 'nigglet', 'faggot', 'benis', 'fag', 'anus', 'anal', 'blowjob', 'blow job', 'dyke', 'dildo', 'cock', 'boner', 'homo', 'jizz', 'nigga', 'queer', 'pussy', 'scrotum', 'slut', 'aetheryx', 'jews', 'cummy', 'niqquers', 'penis', 'gay', 'nibba', 'succ', 'fucc', 'ni🅱🅱a', 'niqqa']

exports.intro = `My name is Dank Memer.\n\nTo get started, send \`${config.prefix} help\`. All commands are run this way, for example, pls meme.\n\nI am maintained by Melmsie#0006, who can be found at [this server](https://discord.gg/3GNMJBG) if you need to talk to him.`

exports.cdMsg = {
	'tweet': 'You can only tweet every 15 minutes. Donors can do it much faster!',
	'spam': 'You can only spam every few minutes. We do NOT want discord banning the bot!'
}

exports.colors = {
	lightblue: '12054271',
	purple: '7869695',
	red: '16711680',
	green: '65280',
	blue: '255',
	black: '0',
	slate: '2500908',
	white: '16777215',
	yellow: '16250241'
}
exports.randomColor = () => {
	const letters = '0123456789'
	let color = ''
	for (let i = 0; i < 7; i++) {
		color += letters[Math.floor(Math.random() * 10)]
	}

	return color
}

exports.randomInArray = array => {
	return array[Math.floor(Math.random() * array.length)]
}


exports.vaporize = text => {
	return text.split('').map(char => {
		if (char === ' ') {
			return '    '
		}
		const c = char.charCodeAt(0)
		return c >= 33 && c <= 126 ?
			String.fromCharCode(c - 33 + 65281) :
			char
	}).join('')
}