exports.run = function (client, msg, args, config, Discord) {
	msg.channel.send("", {embed: new Discord.RichEmbed()
		.setColor('#3676b3')
		.setAuthor(`Commands 💯 👌 🔥`)
		.setDescription(`Want a place to meme? [Join my server!](https://discord.gg/3GNMJBG)`)
		.addField('<:oktrump:294941965416660992> Memey Commands', 'annoy, asktrump, cowsay, gooby, justright, kill, meme, mock, pun, sfw, shitpost')
		.addField('💵  Donator Commands', 'donate, custom, repeat, spam')
		.addField('💰 Donator Tags', 'doge, dolan, fuckyeah, kappa, kappa pride, lenny, lul, megusta, thisisfine, troll')
		.addField('📷 Image Manipulation', 'invert, magik, salty, trigger, warp')
		.addField('🎙 Voice Commands', 'airhorn, funeral, knock, mlg, rickroll, scare, shitsound, stop')
		.addField('🔧 Utilities and Information', 'clean, debug, help, melmsie, ping, stats, tts')
		.setFooter(`Special thanks to CrimsonXV and Aetheryx. Credit for trigger goes to stupidcat.`)
	})
}
