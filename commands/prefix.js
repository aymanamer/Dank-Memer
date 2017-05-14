const fs = require("fs")

exports.run = function(client, msg, args, config, Discord) {
	if (!args[0]) return msg.channel.send({embed: new Discord.RichEmbed()
		.setColor("#ffffff")
		.setDescription(`Current server prefix: ${prefixes[msg.guild.id]}`)
	})

    if (!msg.guild.member(client.user).hasPermission('MANAGE_GUILD') && msg.author.id !== config.owner) return msg.reply("You don't have permission to do this. (Requires `Manage Server`)")

	if (args.join(" ").length > 16) return msg.reply("Keep your prefix under 16 characters :eyes:")

	prefixes[msg.guild.id] = args.join(" ")

	fs.writeFile("./db/prefixdb.json", JSON.stringify(prefixes, "", "\t"), (err) => {
        if (err) return msg.channel.send("Your prefix couldn't be changed.\n" + err.message);
        msg.channel.send(`Prefix successfully changed to \`${prefixes[msg.guild.id]}\` for this guild.`)
        console.log(Date() + ` Prefix for ${msg.guild.name} updated to ${prefixes[msg.guild.id]}`)
    })
}
