exports.run = function (client, msg, args, config, Discord) {
	if (args.length > 140)
		return msg.channel.send(`Tweet too long. You're ${args.length - 140} characters over the limit!`)
	tClient.post('statuses/update', {
		status: args
	}, (err, data, response) => {
		if (err)
			return msg.channel.send('Something went wrong. \n' + err.stack)
		if (response.statusCode !== 200)
			return msg.channel.send('Something went wrong. Please try again later.')
		msg.channel.send({
			embed: new Discord.RichEmbed()
				.setColor('#7d5bbe')
				.setTitle(`Tweet Sent!`)
				.setDescription(`[View here](https://twitter.com/${data.user.screen_name}/status/${data.id_str}) `)
				.setFooter('See this tweet, and more @plsmeme')
		})
	})
}

/*
	Consumer Key (API Key)	Gkan9QvKDjZgWnJajCPMZ8jxL
	Consumer Secret (API Secret)	5x3EkR48doQGXxlrEG2LLvWvemE9We20TlW6dgabC7zRUiScxS

	Access Token	878224959151247361-0sxlyNs1WxVNcsZQmrspT3sWjUnPd1x
	Access Token Secret	nlZbvOYEnlN4vqlcB1Ips5c2qT9suL1KXPRDyDZxaPpsL
*/