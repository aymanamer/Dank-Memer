// why is this not even in the standard lib?
exports.randomInArray = array =>
	array[Math.floor(Math.random() * array.length)]

exports.delayPromise = delay => // h4rdc0r3 4rr0w funct10n5 n35st1ng
	(...args) =>
		new Promise(resolve =>
			setTimeout(() =>
				resolve(...args), delay))


exports.superscriptize = text => // dis kinda function yknow
	text
		.replace(/a/gi, 'ᵃ')
		.replace(/b/gi, 'ᵇ')
		.replace(/c/gi, 'ᶜ')
		.replace(/d/gi, 'ᵈ')
		.replace(/e/gi, 'ᵉ')
		.replace(/f/gi, 'ᶠ')
		.replace(/g/gi, 'ᵍ')
		.replace(/h/gi, 'ʰ')
		.replace(/i/gi, 'ᶦ')
		.replace(/j/gi, 'ʲ')
		.replace(/k/gi, 'ᵏ')
		.replace(/l/gi, 'ˡ')
		.replace(/m/gi, 'ᵐ')
		.replace(/n/gi, 'ⁿ')
		.replace(/o/gi, 'ᵒ')
		.replace(/p/gi, 'ᵖ')
		.replace(/q/gi, 'ᑫ')
		.replace(/r/gi, 'ʳ')
		.replace(/s/gi, 'ˢ')
		.replace(/t/gi, 'ᵗ')
		.replace(/u/gi, 'ᵘ')
		.replace(/v/gi, 'ᵛ')
		.replace(/w/gi, 'ʷ')
		.replace(/x/gi, 'ˣ')
		.replace(/y/gi, 'ʸ')
		.replace(/z/gi, 'ᶻ')

exports.vaporize = text => {
	return text.split('').map(char => {
		if (char === ' ') return '    '
		const c = char.charCodeAt(0)
		return c >= 33 && c <= 126
			? String.fromCharCode(c - 33 + 65281)
			: char
	}).join('')
}
