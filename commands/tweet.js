const twitter = require('../config.json').twitter
const twit = require('twit')
const tClient = new twit({
	consumer_key: twitter.consumer_key,
	consumer_secret: twitter.consumer_secret,
	access_token: twitter.access_token,
	access_token_secret: twitter.access_token_secret,
	timeout_ms: 60 * 1000,
})

exports.run = async function (Memer, msg, args) {
	if (!Memer.isDonator(msg.author.id)) {
		return Memer.reply('You need to both be on Melmsie\'s server and be a donor to use this command (you can thank all the assholes who decided to ruin it)! To join the server, use `pls invite`. To donate, use `pls donate`.', msg)
	}

	if (!args[0] || msg.mentions[0]) {
		return Memer.reply('What do you want me to tweet?', msg)
	}

	if (args.join(' ').length > 140) {
		return msg.channel.createMessage(`Tweet too long. You're ${args.join(' ').length - 140} characters over the limit!`)
	}

	msg.channel.createMessage(`Are you sure you want to tweet \`${args.join(' ')}\`?\nYou will be **permanently banned** from using Dank Memer for tweets that are mean or racist. Currently banned: ${Memer.ids.blocked.user.length} idiots.\n\nAnswer with \`yes\`/\`no\`.`)

	const [messages, reason] = await Memer.createMessageCollector(msg.channel, m => m.author.id === msg.author.id, { maxMatches: 1, time: 30000 })

	if (reason === 'maxMatches' && messages[0].content.toLowerCase() === 'yes') {
		tClient.post('statuses/update', { status: args.join(' ') }, (err, data, response) => {
			if (err) {
				return msg.channel.createMessage(`Something went wrong. \n${err.message}`)
			}
			if (response.statusCode !== 200) {
				return msg.channel.createMessage('Something went wrong. Please try again later.')
			}
			msg.channel.createMessage({ embed: {
				color: Memer.colors.lightblue,
				title: 'Tweet Sent!',
				description: `[View here](https://twitter.com/${data.user.screen_name}/status/${data.id_str})`,
				footer: { text: 'See this tweet, and more @plsmeme' }
			}})
			Memer.client.guilds.get('281482896265707520').channels.get('326384964964974602')
				.createMessage({
					content: Memer.bannedWords.some(word => args.join(' ').toLowerCase().includes(word)) ? '<@&339186850910699520> BAD TWEET LADS WEE WOO WEE WOO' : '',
					embed: {
						title: 'New tweet:',
						url: `https://twitter.com/PlsMeme/status/${data.id_str}`,
						author: { name: `${msg.author.username}#${msg.author.discriminator} | ${msg.author.id}` },
						description: args.join(' '),
						fields: [ { name: 'Sent from:', value: `#${msg.channel.name} in ${msg.channel.guild.name}` } ],
						color: 0x4099FF,
						footer: { text: `Tweet ID: ${data.id_str} | Guild ID: ${msg.channel.guild.id} `},
						timestamp: new Date(),
					}})
		})
	} else if (reason === 'maxMatches' && messages[0].content.toLowerCase() === 'no') {
		msg.channel.createMessage('Good. Watching you :eyes:')
	} else if (reason === 'maxMatches') {
		msg.channel.createMessage('mk bye then') // placeholder
	} else {
		msg.channel.createMessage('Prompt timed out.')
	}
}

