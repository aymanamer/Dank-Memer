exports.run = function (client, msg, args, config, Discord) {
    msg.channel.send({embed: new Discord.RichEmbed()
		.setColor("#b7eeff")
		.setTitle(`Patreon!`)
		.setDescription(`Help me pay for Dank Memer's server costs!`)
		.addField("$1 per month", "- Donator Role\n- The ability to have memer repeat anything you say in chat! `pls repeat`")
        .addField("$5 per month", "- Donator Role\n- The ability to have memer repeat anything you say in chat! `pls repeat`\n- Access to spam command `pls spam`")
        .addField("$10 per month", "- Donator Role\n- The ability to have memer repeat anything you say in chat! `pls repeat`\n- Access to spam command `pls spam`\n- Your own custom command (within reason)\n- Early access to new commands")
        .addField("Donate Here", "https://www.patreon.com/melmsie")
		
	})

}
