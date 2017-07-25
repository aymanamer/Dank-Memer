const twit = require('twit')
const tClient = new twit({
	consumer_key:         'Gkan9QvKDjZgWnJajCPMZ8jxL',
	consumer_secret:      '5x3EkR48doQGXxlrEG2LLvWvemE9We20TlW6dgabC7zRUiScxS',
	access_token:         '878224959151247361-0sxlyNs1WxVNcsZQmrspT3sWjUnPd1x',
	access_token_secret:  'nlZbvOYEnlN4vqlcB1Ips5c2qT9suL1KXPRDyDZxaPpsL',
	timeout_ms:           60*1000,
})
exports.run = async function (client, msg, args, utils) {
	args = msg.cleanContent.split(' ').slice(2).join(' ')
	if (args.length < 1) {
		return msg.channel.send('What do you want me to tweet?')
	}
	if (args.length > 140) {
		return msg.channel.send(`Tweet too long. You're ${args.length - 140} characters over the limit!`)
	}
	msg.channel.send(`Are you sure you want to tweet \`${args}\`? You will be **permanently banned** from using Dank Memer for tweets that are mean or racist. Answer with \`yes\`/\`no\`.`)
	const collector = msg.channel.createMessageCollector(m => msg.author.id === m.author.id, { time: 40000 })
	collector.on('collect', (m) => {
		if (m.content.toLowerCase() === 'yes') {
			tClient.post('statuses/update', { status: args }, (err, data, response) => {
				if (err) {
					return msg.channel.send(`Something went wrong. \n${err.message}`)
				}
				if (response.statusCode !== 200) {
					return msg.channel.send('Something went wrong. Please try again later.')
				}
				msg.channel.send({
					embed:
					{
						color: utils.colors.lightblue,
						title: 'Tweet Sent!',
						description: `[View here](https://twitter.com/${data.user.screen_name}/status/${data.id_str})`,
						footer: { text: 'See this tweet, and more @plsmeme'}
					}
				})
				let badtweet = ''
				if (utils.bannedWords.some(word => args.toLowerCase().includes(word))) {
					badtweet = '<@&339186850910699520> BAD TWEET LADS WEE WOO WEE WOO'
				}
				client.shard.broadcastEval(`
					this.channels.has('326384964964974602') && this.channels.get('326384964964974602').send('BEDTWIET', { embed: {
    					title: 'New tweet:',
    					url: 'https://twitter.com/PlsMeme/status/T_ID',
						author: { name: 'A_TAG | A_ID' },
						description: 'ARGS',
						fields: [ { name: 'Sent from:', value: '#C_NAME in G_NAME' } ],
						color: 0x4099FF,
						timestamp: new Date(),
						footer: { text: 'Tweet ID: T_ID | Guild ID: G_ID' }
					} })`
						.replace(/T_ID/g, data.id_str)
						.replace(/G_ID/g, msg.guild.id)
						.replace(/C_NAME/g, msg.channel.name.replace(/'|"|`/g, ''))
						.replace(/G_NAME/g, msg.guild.name.replace(/'|"|`/g, ''))
						.replace(/A_TAG/g, msg.author.tag.replace(/'|"|`/g, ''))
						.replace(/A_ID/g, msg.author.id)
						.replace(/ARGS/g, args.replace(/'|"|`/g, ''))
						.replace(/BEDTWIET/g, badtweet))
							.catch(err => console.log(`TWEET BROADCASTEVAL ERR: ${err.stack}`))
			})
		}
		else {
			msg.channel.send('Good. Watching you :eyes:')
		}
		return collector.stop()
	})
	collector.on('end', (collected, reason) => {
		if (reason === 'time') {
			msg.channel.send('Prompt timed out.')
		}
	})
}
