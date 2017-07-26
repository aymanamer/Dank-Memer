const config = require('./config.json')

exports.disabledEvents = [
	'CHANNEL_PINS_UPDATE',
	'USER_SETTINGS_UPDATE',
	'USER_NOTE_UPDATE',
	'RELATIONSHIP_ADD',
	'RELATIONSHIP_REMOVE',
	'GUILD_BAN_ADD',
	'GUILD_BAN_REMOVE',
	'MESSAGE_UPDATE',
	'MESSAGE_DELETE_BULK',
	'MESSAGE_REACTION_REMOVE',
	'MESSAGE_REACTION_REMOVE_ALL'
]

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

exports.bannedWords = ['kys', 'kill yourself', 'nigger', 'nagger', 'nigglet', 'faggot', 'fag', 'anus', 'anal', 'blowjob', 'blow job', 'dyke', 'dildo', 'cock', 'boner', 'homo', 'jizz', 'nigga', 'queer', 'pussy', 'scrotum', 'slut', 'aetheryx']

exports.intro = `My name is Dank Memer.\n\nTo get started, send \`${config.prefix} help\`.\n\nI am maintained by Melmsie#0006, who can be found at [this server](https://discord.gg/3GNMJBG) if you need to talk to him.`

exports.cdMsg = {
	'tweet': 'You can only tweet every 15 minutes. Donors can do it much faster!',
	'spam': 'You can only spam every few minutes. We do NOT want discord banning the bot!',
	'annoy': 'Due to this command being annoying (lol), you can only use it once per hour. Donors can do it much faster!'
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

exports.randomInArray = array =>
	array[Math.floor(Math.random() * array.length)]

exports.vaporize = text => {
	return text.split('').map(char => {
		if (char === ' ') {
			return
		}
		'    '
		const c = char.charCodeAt(0)
		return c >= 33 && c <= 126 ?
			String.fromCharCode(c - 33 + 65281) :
			char
	}).join('')
}