exports.run = function (undefined, msg, undefined, undefined, Discord) {
	msg.channel.send({
		embed: new Discord.RichEmbed()
			.setColor('#3676b3')
			.setURL('https://www.patreon.com/melmsie')
			.setTitle('Donate to Dank Memer on Patreon!')
			.setDescription('**__Premium Key Contents:__**\n❯ *75% reduced cooldowns on all commands*\n❯ *Donor role on Meme Central*\n❯ *Access to pls repeat*\n❯ *Guaranteed faster support*\n❯ *The opportunity to help test new commands*')
			.addField('$2 Tier <:feelsbadman:326155536867393536>', '❯ 1 Premium Key')
			.addField('$5 Tier <:feelscuteman:325733304072667146>', '❯ 1 Premium Key\n❯ Access to pls spam\n❯ pls dank will generate a gif for you')
			.addField('$10 Tier <:feelskawaiiman:326155537073045504>', '❯ 2 Premium Keys (Give one to a friend!)\n❯ Access to pls spam\n❯ pls dank will generate a gif for you\n❯ 1 custom command')
			.addField('$20 Tier <:feelsgreatman:326155536800284673>', '❯ 3 Premium Keys (Give one to two friend!)\n❯ Access to pls spam\n❯ pls dank will generate a gif for you\n❯ 2 custom commands')
			.setFooter('Donating will always be optional, and always appreciated! :D')
	})
}
