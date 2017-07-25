exports.run = function (client, msg, args, utils) {
	msg.channel.send({ embed: {
		color: utils.colors.lightblue,
		fields: [
			{ name: 'Add Dank Memer', value: `\n[Here](https://discordapp.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=8)`, inline: true },
			{ name: 'Join a Dank Server', value: '\n[Here](https://discord.gg/3GNMJBG)', inline: true }
		]
	}})
}
