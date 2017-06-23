const twit = require('twit')
const tClient = new twit({
	consumer_key:         'Gkan9QvKDjZgWnJajCPMZ8jxL',
	consumer_secret:      '5x3EkR48doQGXxlrEG2LLvWvemE9We20TlW6dgabC7zRUiScxS',
	access_token:         '878224959151247361-0sxlyNs1WxVNcsZQmrspT3sWjUnPd1x',
	access_token_secret:  'nlZbvOYEnlN4vqlcB1Ips5c2qT9suL1KXPRDyDZxaPpsL',
	timeout_ms:           60*1000,
})

exports.run = function (client, msg, args, undefined, Discord) {
	args = args.join(' ')
	if (args.length < 1)
		return msg.channel.send('What do you want me to tweet?')
	if (args.length > 140)
		return msg.channel.send(`Tweet too long. You're ${args.length - 140} characters over the limit!`)

	msg.channel.send(`Are you sure you want to tweet \`${args}\`? You will be **permanently banned** from using Dank Memer for bad tweets. Answer with \`yes\`/\`no\`.`)
	const collector = msg.channel.createMessageCollector(m => msg.author.id === m.author.id, { time: 40000 })
	collector.on('collect', (m) => {
		if (m.content.toLowerCase() === 'yes') {
			tClient.post('statuses/update', { status: args }, (err, data, response) => {
				if (err)
					return msg.channel.send('Something went wrong. \n' + err.stack)
				if (response.statusCode !== 200)
					return msg.channel.send('Something went wrong. Please try again later.')
				msg.channel.send({
					embed: new Discord.RichEmbed()
						.setColor('#7d5bbe')
						.setTitle('Tweet Sent!')
						.setDescription(`[View here](https://twitter.com/${data.user.screen_name}/status/${data.id_str}) `)
						.setFooter('See this tweet, and more @plsmeme')
				})
			})
		} else {
			msg.channel.send('Good. Watching you :eyes:')
		}
		return collector.stop()
	})
	collector.on('end', (collected, reason) => {
		if (reason === 'time') 
			msg.channel.send('Prompt timed out.')
	})
}
