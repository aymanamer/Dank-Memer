const fs = require("fs")

exports.run = function (client, msg, args, config, Discord) {

	msg.channel.send({embed: new Discord.RichEmbed()
        .setColor('#7d5bbe')
        .setTitle(`${client.user.username} - Help\n`)
		.setDescription(`Latest Announcement:\n${fs.readFileSync("./db/announcement.txt").toString()}`)
        .addField(`Prefix: ${config.prefix}`, `Example: ${config.prefix} shitpost`)
        .addField('Commands', `Send "${config.prefix} commands" to see a full list of commands.`)
        .addField('Most Popular Commands', 'pls shitpost, pls shitsound, pls meme, pls trigger')
        .addField('Links', '[Bot invite](https://discordapp.com/oauth2/authorize?client_id=270904126974590976&scope=bot&permissions=3073) | [Support server invite](https://discord.gg/Ek6MM5n)')
    })

}
