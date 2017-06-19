exports.run = function (client, msg, args, config, Discord) {
	msg.channel.send("", {
		embed: new Discord.RichEmbed()
			.setColor('#3676b3')
			.setURL('https://www.patreon.com/melmsie')
			.setTitle(`Donate to Dank Memer on Patreon!`)
			.setDescription(`*Be sure to message Melmsie#0006 to receive rewards!*`)
			.addField('$1 Tier <:feelsbadman:326155536867393536>', '1. Donator Role on my personal server\n2. Access to pls repeat')
			.addField('$5 Tier <:feelscuteman:325733304072667146>', '1. All previous Rewards\n2. Access to pls spam\n3. Reduced cooldown for pls annoy (5 minutes)')
			.addField('$10 Tier <:feelskawaiiman:326155537073045504>', '1. All previous rewards\n2. Access tags (feelsbadman, lenny, lul, dolan, etc)\n3. A custom command')
			.addField('$20 Tier <:feelsgreatman:326155536800284673>', '1. All previous rewards\n2. Another custom command (two total)\n3. One of your friends can take advantage of donor perks')
			.setFooter(`Donating will always be optional, and always appreciated! :D`)
	})
}
