exports.run = async function (client, msg, args, utils) {
	await msg.channel.send({ embed: {
		color: utils.colors.lightblue,
		fields: [
			{ name: 'Add Dank Memer', value: '\n[Here](https://goo.gl/yyngZG)', inline: true },
			{ name: 'Join a Dank Server', value: '\n[Here](https://discord.gg/3GNMJBG)', inline: true }
		]
	}})
}
