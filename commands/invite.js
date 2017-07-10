exports.run = function (client, msg, args, config, EmbedBuilder) {
	msg.channel.send({
		embed: new EmbedBuilder()
			.setColor('#3676b3')
			.addField('Add Dank Memer', `\n[Here](https://discordapp.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=8)`, true)
			.addField('Join a Dank Server', '\n[Here](https://discord.gg/3GNMJBG)', true)
	})
}
