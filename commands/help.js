const fs = require("fs")

exports.run = function (client, msg, args, config, Discord, prefixdb) {

	msg.channel.send({embed: new Discord.RichEmbed()
        .setColor('#7d5bbe')
        .setTitle(`${client.user.username} - Help\n`)
		.setDescription(`Latest Announcement:\n${fs.readFileSync("./db/announcement.txt").toString()}`)
        .addField(`Prefix: ${prefixes[msg.guild.id]}`, `Example: ${prefixes[msg.guild.id]} shitpost`)
        .addField('Commands', `Send "${prefixes[msg.guild.id]} commands" to see a full list of commands.`)
        .addField('Links', '[Bot invite](https://discordapp.com/oauth2/authorize?client_id=270904126974590976&scope=bot&permissions=3073) | [Support server invite](https://discord.gg/Ek6MM5n)')
    })

}
