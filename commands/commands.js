const fs = require("fs")
   
exports.run = function (client, msg, args, config, Discord) {
	if (!msg.guild.member(client.user).hasPermission('SEND_MESSAGES')) return msg.author.send('I do not have permission to send messages in that channel! Please fix this to use this command.').catch(console.error)
 
	msg.channel.send("", {embed: new Discord.RichEmbed()
		.setColor('#ff0000')
		.setAuthor(`Commands`)
		.setDescription(`Latest Announcement: ${fs.readFileSync("./db/announcement.txt").toString()}`)
		.addField('<:megusta:293231471173304320> Memey Commands', 'annoy, asktrump, blasphemy, justright, kill, mama, meme, mock, oneliner, pun, shitpost')
		.addField('💰 Donator Commands', 'donate, repeat, spam')
		.addField('<:LUL:298887728161095681> Tags & text ｍａｎｉｐｕｌａｔｉｏｎ', 'feelsbadman, justright, vaporwave')
		.addField('🖼 Image Manipulation', 'invert, magik, salty, trigger, warp')
		.addField('🎤 Voice Commands', 'airhorn, knock, mlg, rickroll, scare, shitsound, stop')
		.addField('ℹ Utilities and Information', 'clean, commands, help, melmsie, ping, stats')
		.setFooter(`Special thanks to CrimsonXV and Aetheryx. Credit for trigger goes to stupidcat.`)
	})
}
