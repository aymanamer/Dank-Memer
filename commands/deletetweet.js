const twit = require('twit')
const tClient = new twit({
	consumer_key:         'Gkan9QvKDjZgWnJajCPMZ8jxL',
	consumer_secret:      '5x3EkR48doQGXxlrEG2LLvWvemE9We20TlW6dgabC7zRUiScxS',
	access_token:         '878224959151247361-0sxlyNs1WxVNcsZQmrspT3sWjUnPd1x',
	access_token_secret:  'nlZbvOYEnlN4vqlcB1Ips5c2qT9suL1KXPRDyDZxaPpsL',
	timeout_ms:           60*1000,
})

exports.run = function (undefined, msg, args, config, Discord) {
 
	if (msg.author.id !== config.owner) return

	if (!parseInt(args[0]))
		return msg.channel.send('Argument error. Make sure the argument(s) you\'re passing are numbers and exist.')
	args.filter(arg => parseInt(arg)).forEach(targetTweetID => {

		tClient.post('statuses/destroy/:id', { id: targetTweetID }, (err, data, response) => {
			if (!err && response.statusCode === 200)

				msg.channel.send({ 
					embed: new Discord.RichEmbed()
						.setColor('#4099FF')
						.setDescription(`Tweet ${targetTweetID} successfully deleted.`)
				})
		})
	})
}