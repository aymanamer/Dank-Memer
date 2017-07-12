exports.randomInArray = array =>
	array[Math.floor(Math.random() * array.length)]

exports.vaporize = text => {
	return text.split('').map(char => {
		if (char === ' ') return '    '
		const c = char.charCodeAt(0)
		return c >= 33 && c <= 126
			? String.fromCharCode(c - 33 + 65281)
			: char
	}).join('')
}
