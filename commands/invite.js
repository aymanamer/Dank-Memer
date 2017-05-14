exports.run = function (client, msg, args, config, Discord) {
	msg.channel.send("", {embed: new Discord.RichEmbed()
				.setColor("#3676b3")
				.addField('Add Dank Memer', `\n[Here](https://discordapp.com/oauth2/authorize?client_id=270904126974590976&scope=bot&permissions=3073)`, true)
				.addField('Join a Dank Server', `\n[Here](https://discord.gg/3GNMJBG)`, true)
		})
}
