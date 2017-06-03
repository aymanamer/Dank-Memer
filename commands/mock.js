exports.run = function (client, msg, args, config, Discord) {

	if (!args[0]) return msg.reply("You gotta give me something to mock :eyes:")

	if (!msg.channel.permissionsFor(client.user.id).has("ATTACH_FILES")) {
		return msg.author.send('I don\'t have permission to send pictures in #' + msg.channel.name)
	}

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