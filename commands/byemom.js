const snakefetch = require('snekfetch')

exports.run = async function (client, msg, args) {
	msg.channel.startTyping()

	let avatarurl = msg.mentions.users.size > 0 ? msg.mentions.users.first().displayAvatarURL.replace("gif", "png") : msg.author.displayAvatarURL.replace("gif", "png")

	if (msg.mentions.users.size > 0) args = args.join(' ').substr(21)
	else args = args.join(' ')

	if (args.length < 1)
		return msg.channel.send('What do you want to google search?')
	if (args.length > 140)
		return msg.channel.send(`Google Search too long. You're ${args.length - 140} characters over the limit!`)

	let data = await snakefetch
		.get('http://www.get-ur-me.me/api/byemom')
		.set('Api-Key', 'XfGC62d9xKiOc4IegPdz')
		.set('data-src', JSON.stringify([`${avatarurl}`, `${args}`]));

	if (data.status === 200) {
		msg.channel.send({
			files: [{
				name: 'byemom.png',
				attachment: data.body
			}]
		}).then(m => {
			client.shard.broadcastEval(`const { RichEmbed } = require('discord.js')\nthis.channels.has('329799125015199744') && this.channels.get('329799125015199744').send({ embed: new RichEmbed().setAuthor('${msg.author.tag}').setImage('${m.attachments.first().url}') .addField('Sent from:', '#${msg.channel.name} in ${msg.guild.name}').setColor('#00c853')})`)
			msg.channel.stopTyping()
		})
		
		
		
		
	} else {
		msg.channel.send('Error: ' + data.text)
		msg.channel.stopTyping()
	}
}