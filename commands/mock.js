exports.run = function (client, msg, args, config, Discord) {

	let dumb = args.join(' ').replace(/c/gi, 'k').replace(/v/gi, 'c')

	let textArray = (dumb).toLowerCase().split('')

	function capitalizeEven(char, index) {
		if (index % 2 === 0) {
			return char.toUpperCase()
		} else {
			return char
		}
	}

	let done = textArray.map(capitalizeEven).join('')

	msg.channel.send(done, {
		files: ['https://pbs.twimg.com/media/DAU-ZPHUIAATuNy.jpg']
	})

}