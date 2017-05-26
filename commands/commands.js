const fs = require("fs")
   
exports.run = function (client, msg, args, config, Discord) {
	if (!msg.guild.member(client.user).hasPermission('SEND_MESSAGES')) return msg.author.send('I do not have permission to send messages in that channel! Please fix this to use this command.').catch(console.error)
 
	msg.channel.send("", {embed: new Discord.RichEmbed()
		.setColor('#ff0000')
		.setAuthor(`Commands`)
		.setDescription(`Latest Announcement: ${fs.readFileSync("./db/announcement.txt").toString()}`)
		.addField('<:megusta:293231471173304320> Memey Commands', 'asktrump, blasphemy, justright, kill, mama, meme, oneliner, pun, pupper, shitpost, vote')
		.addField('💰 Donator Commands', 'ban, donate, kick, repeat, spam')
		.addField('<:LUL:298887728161095681> Tags & text ｍａｎｉｐｕｌａｔｉｏｎ', 'feelsbadman, justright, lenny, lul, vaporwave')
		.addField('🖼 Image Manipulation', 'trigger *(thanks blargbot)*, invert, salty, warp')
		.addField('🎤 Voice Commands', 'airhorn, knock, mlg, shitsound')
		.addField('ℹ Utilities and Information', 'commands, help, melmsie, ping, prefix, stats')
		.setFooter(`Any questions or ideas? Come hang out on this server: discord.gg/3GNMJBG`)
	})
}
