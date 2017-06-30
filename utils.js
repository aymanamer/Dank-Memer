// why is this not even in the standard lib?
exports.randomInArray = array =>
	array[Math.floor(Math.random() * array.length)]

exports.delayPromise = delay => // h4rdc0r3 4rr0w funct10n5 n35st1ng
	(...args) =>
		new Promise(resolve =>
			setTimeout(() =>
				resolve(...args), delay))

exports.morse = text => // dis kinda function yknow
	text
		.replace(/a/gi, '😄 🍆')
			.replace(/b/gi, '🍆 😄 😄 😄')
		.replace(/c/gi, '🍆 😄 🍆 😄')
		.replace(/d/gi, '🍆 😄 😄')
		.replace(/e/gi, '😄')
		.replace(/f/gi, '😄 😄 🍆 😄')
		.replace(/g/gi, '🍆 🍆 😄')
		.replace(/h/gi, '😄 😄 😄 😄')
		.replace(/i/gi, '😄 😄')
		.replace(/j/gi, '😄 🍆 🍆 🍆')
		.replace(/k/gi, '🍆 😄 🍆')
		.replace(/l/gi, '😄 🍆 😄 😄')
		.replace(/m/gi, '🍆 🍆')
		.replace(/n/gi, '🍆 😄')
		.replace(/o/gi, '🍆 🍆 🍆')
		.replace(/p/gi, '😄 🍆 🍆 😄')
		.replace(/q/gi, '🍆 🍆 😄 🍆')
		.replace(/r/gi, '😄 🍆 😄')
		.replace(/s/gi, '😄 😄 😄')
		.replace(/t/gi, '🍆')
		.replace(/u/gi, '😄 😄 🍆')
		.replace(/v/gi, '😄 😄 😄 🍆')
		.replace(/w/gi, '😄 🍆 🍆')
		.replace(/x/gi, '🍆 😄 😄 🍆')
		.replace(/y/gi, '🍆 😄 🍆 🍆')
		.replace(/z/gi, '🍆 🍆 😄 😄')
		.replace(/1/gi, '😄 🍆 🍆 🍆 🍆')
		.replace(/2/gi, '😄 😄 🍆 🍆 🍆')
		.replace(/3/gi, '😄 😄 😄 🍆 🍆')
		.replace(/4/gi, '😄 😄 😄 😄 🍆')
		.replace(/5/gi, '😄 😄 😄 😄 😄')
		.replace(/6/gi, '🍆 😄 😄 😄 😄')
		.replace(/7/gi, '🍆 🍆 😄 😄 😄')
		.replace(/8/gi, '🍆 🍆 🍆 😄 😄')
		.replace(/9/gi, '🍆 🍆 🍆 🍆 😄')
		.replace(/0/gi, '🍆 🍆 🍆 🍆 🍆')

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
