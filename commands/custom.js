exports.run = function (client, msg) {
	msg.channel.send({
		embed: new EmbedBuilder()
			.setColor('#3676b3')
			.setAuthor('Dank Memer Custom Commands')
			.setDescription('All of these commands are rewards for either donating or winning a giveaway!')
			.addField('pls detain', 'by `an unsuspecting box of bleach#5112`')
			.addField('pls doit', 'by `Swiggity#7716`')
			.addField('pls swiggity', 'by `Swiggity#7716`')
			.addField('pls yeahboi', 'by `Moboly#1605`')
			.addField('pls dankrate', 'by `LoverofSporks#2433`')
			.addField('pls suprise', 'by `Liam#7475`')
			.setFooter('Want your own custom command? Donate at https://www.patreon.com/melmsie')
	}).catch((e) => console.log(e.message))
}
