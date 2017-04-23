const fs = require("fs")

exports.run = function (client, msg, args, config, Discord) {
	msg.channel.sendEmbed(new Discord.RichEmbed()
		.setColor('#ff0000')
		.setAuthor(`Commands`)
		.setDescription(`Latest Announcement: ${fs.readFileSync("./db/announcement.txt").toString()}`)
		.addField('<:megusta:293231471173304320> Memey Commands', 'asktrump, blasphemy, fo, justright, mama, oneliner, pun, pupper, shitpost')
		.addField('<:LUL:298887728161095681> Tags & text ｍａｎｉｐｕｌａｔｉｏｎ', 'feelsbadman, justright, lenny, lul, vaporwave')
		.addField('🖼 Image Manipulation', 'trigger, invert, salty, magik, warp')
		.addField('🎤 Voice Commands', 'airhorn')
		.addField('ℹ Utilities and Information', 'commands, help, ping, ~~prefix~~, stats')
		.addField('<:memesie:298886809524502529> Melmsie Only', 'bash, blacklist, eval, find, kys, servers, spyon, whitelist')
		.addField('Coming <:soon:233642257817927680>', 'memegen, spam, roasts')
		.setFooter(`Be sure to use the prefix: ${prefixes[msg.guild.id]}`)
	)
}
