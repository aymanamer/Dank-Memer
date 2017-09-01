exports.run = function (Memer, msg) {
	msg.channel.createMessage({ embed: {
		color: Memer.colors.lightblue,
		fields: [
			{ name: 'Add Dank Memer', value: '\n[Here](https://goo.gl/yyngZG)', inline: true },
			{ name: 'Join a Dank Server', value: '\n[Here](https://discord.gg/3GNMJBG)', inline: true }
		]
	}})
}
