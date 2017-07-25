const twitter = require('./config.json').twitter
const twit = require('twit')
const tClient = new twit({
	consumer_key: twitter.consumer_key,
	consumer_secret: twitter.consumer_secret,
	access_token: twitter.access_token,
	access_token_secret: twitter.access_token_secret,
	timeout_ms: 60 * 1000,
})
exports.run = async function (client, msg, args, config, utils) {

	args = msg.cleanContent.split(' ').slice(2).join(' ')
	if (args.length < 1) {
		return msg.channel.send('What do you want me to tweet?')
	}
	if (args.length > 140) {
		return msg.channel.send(`Tweet too long. You're ${args.length - 140} characters over the limit!`)
	}
	msg.channel.send(`Are you sure you want to tweet \`${args}\`? You will be **permanently banned** from using Dank Memer for tweets that are mean or racist. Answer with \`yes\`/\`no\`.`)
	const collector = msg.channel.createMessageCollector(m => msg.author.id === m.author.id, {
		time: 40000
	})
	collector.on('collect', (m) => {
		if (m.content.toLowerCase() === 'yes') {
			tClient.post('statuses/update', {
				status: args
			}, (err, data, response) => {
				if (err) {
					return msg.channel.send(`Something went wrong. \n${err.message}`)
				}
				if (response.statusCode !== 200) {
					return msg.channel.send('Something went wrong. Please try again later.')
				}
				msg.channel.send({
					embed: {
						color: utils.colors.lightblue,
						title: 'Tweet Sent!',
						description: `[View here](https://twitter.com/${data.user.screen_name}/status/${data.id_str})`,
						footer: {
							text: 'See this tweet, and more @plsmeme'
						}
					}
				})
				client.shard.broadcastEval(`const { RichEmbed } = require('discord.js')\nthis.channels.has('326384964964974602') && this.channels.get('326384964964974602').send({ embed: new RichEmbed().setTitle('New tweet:').setAuthor('${msg.author.tag} | ${msg.author.id}').setDescription('${args}').addField('Sent from:', '#${msg.channel.name} in ${msg.guild.name}').setColor('#4099FF').setTimestamp(new Date()).setFooter('Tweet ID: ${data.id_str} | Guild ID: ${msg.guild.id}').setURL('https://twitter.com/${data.user.screen_name}/status/${data.id_str}')})`)
			})
		} else {
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