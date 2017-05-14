const fs = require('fs')

exports.run = function (client, msg, args, config, Discord) {
    if (msg.author.id !== config.owner) return msg.reply(`:x::weary::raised_back_of_hand:`)

	fs.writeFile("./db/announcement.txt", args.join(" "), (err) => {
		if (err) return msg.reply("Couldn't create an announcement ¯\_(ツ)_/¯")
	})

    msg.channel.send("", {embed: new Discord.RichEmbed()
        .setColor('#ffffff')
        .setDescription(`Announcement added: ${args.join(" ")}`)
	})

	client.channels.get("298668852957675520").send("", {embed: new Discord.RichEmbed()
		.setTitle("ℹ Announcement ℹ")
		.setColor('#ff0000')
		.setTimestamp()
		.setDescription(args.join(" "))
	})
}
