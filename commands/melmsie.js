exports.run = function (client, msg, args, config, Discord) {
	msg.channel.send("", {embed: new Discord.RichEmbed()
		.setColor('#3676b3')
		.setAuthor(`About Melmsie 👌`)
		.setDescription(`Melmsie is the creator behind Dank Memer. He is a memer and a dreamer. What else do you need to know?`)
		.addField('Past Aliases', 'Melmsie Poo\nNPM ERR\nMemes => Dreams', true)
		.addField('Usual Games', '**Xbox**: Mass Effect, Halo Wars, COD Zombies\n**PC**: GTA V, Overwatch, Skyrim, Horor Games', true)
		.addField('Favorite Memes', 'dat boi, just do it, rick roll, PPAP', true)
		.addField('Fav Music', 'Frank Turner, Macklemore, Lil Dicky', true)
        .addField('Social Accounts', '<:youtube:314349922885566475> [Melmsie](https://www.youtube.com/user/Memyselfandlie)\n<:battlenet:314349923006939136> Melmsie#1311\n<:twitter:314349922877046786> [MelmsiePoo](https://twitter.com/melmsiepoo)')
		.setFooter(`Wanna talk to Melmsie? Come hang out on this server: discord.gg/3GNMJBG`)
	})
}

