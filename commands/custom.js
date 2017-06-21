exports.run = function (undefined, msg, undefined, undefined, Discord) {
	msg.channel.send({
		embed: new Discord.RichEmbed()
			.setColor('#3676b3')
			.setAuthor('Dank Memer Custom Commands')
			.setDescription('All of these commands are rewards for either donating or winning a giveaway!')
			.addField('pls detain', 'by `an unsuspecting box of bleach#5112`')
			.addField('pls doit', 'by `Swiggity#7716`')
			.addField('pls swiggity', 'by `Swiggity#7716`')
			.setFooter('Want your own custom command? Donate $5 or more at https://www.patreon.com/melmsie')
	})
}
